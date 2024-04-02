using System.Linq.Expressions;
using api.Domain;
using MongoDB.Driver;

namespace api.Infrastructure.MongoDB;

public sealed class RecipeCollection : Collection, IRecipeRepository, IRecipeCollection
{
    readonly IMongoCollection<RecipeDoc> _collection;

    public RecipeCollection(MongoDatabase mongo) : base()
    {
        _collection = mongo.Database.GetCollection<RecipeDoc>("recipes");
    }

    public ValueTask AddAsync(Recipe recipe, CancellationToken cancellationToken = default)
    {
        RecipeDoc doc = RecipeDoc.Create(recipe);
        return new ValueTask(_collection.InsertOneAsync(doc, default, cancellationToken));
    }

    public ValueTask<IQueryable<Recipe>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return new ValueTask<IQueryable<Recipe>>(_collection
            .AsQueryable()
            .Select(s_asRecipe));
    }

    public ValueTask<Recipe?> GetAsync(EntityId entityId, CancellationToken ct = default)
    {
        string id = entityId.ToString();
        return new ValueTask<Recipe?>(_collection
            .Find(Builders<RecipeDoc>.Filter.Eq(x => x.Id, id), s_findOptions)
            .Project(RecipeProjectionDefinition())
            .FirstOrDefaultAsync(ct)!);
    }

    static ProjectionDefinition<RecipeDoc, Recipe> RecipeProjectionDefinition()
    {
        return new ProjectionDefinitionBuilder<RecipeDoc>().Expression(x => new Recipe()
        {
            Id = new EntityId(x.Id),
            Title = x.Title,
            CreatedAt = x.CreatedAt,
        });
    }

    static readonly Expression<Func<RecipeDoc, Recipe>> s_asRecipe = doc => new Recipe()
    {
        Id = new EntityId(doc.Id),
        Title = doc.Title,
        CreatedAt = doc.CreatedAt,
    };
}
