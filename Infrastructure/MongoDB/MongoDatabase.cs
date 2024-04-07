using Domain;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Infrastructure.MongoDB;

public sealed class MongoDatabase : DbContext
{
    public IMongoDatabase Database { get; }

    public MongoDatabase(IOptions<PersistenceSettings> persistenceSettings)
    : base()
    {
        ConventionPack camelCaseConvention = new ConventionPack {
            new CamelCaseElementNameConvention()
        };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, (type) => true);

        if (!BsonClassMap.IsClassMapRegistered(typeof(RecipeDoc))) // ToDo: Check where this call belongs
        {
            BsonClassMap.RegisterClassMap<Document>(x =>
            {
                x.AutoMap();
                x.MapMember(doc => doc.ModelVersion).SetElementName("__v");
                x.MapMember(doc => doc.Id).SetElementName("_id");
            });

            BsonClassMap.RegisterClassMap<ChefDoc>(x =>
            {
                x.AutoMap();
                x.SetDiscriminator(nameof(Document));
            });

            BsonClassMap.RegisterClassMap<RecipeDoc>(x =>
            {
                x.AutoMap();
                x.SetDiscriminator(nameof(Document));
            });
        }

        MongoClientSettings settings = MongoClientSettings.FromConnectionString(persistenceSettings.Value.ConnectionString);
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        MongoClient client = new MongoClient(settings);

        string databaseName = Common.Globals.ApplicationNameAbbreviated.ToLower();

        Database = client.GetDatabase(databaseName);
    }
}

// Help:
// http://mongodb.github.io/mongo-csharp-driver/2.2/reference/bson/mapping/
// http://mongodb.github.io/mongo-csharp-driver/2.2/reference/bson/mapping/#mapping-classes
// https://www.mongodb.com/docs/drivers/csharp/current/fundamentals/class-mapping/
