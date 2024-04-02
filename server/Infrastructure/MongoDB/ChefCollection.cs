using System.Linq.Expressions;
using api.Domain;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace api.Infrastructure.MongoDB;

public sealed class ChefCollection : Collection, IChefRepository
{
    readonly IMongoCollection<ChefDoc> _collection;

    public ChefCollection(IMongoDatabase database)
    {
        _collection = database.GetCollection<ChefDoc>("chefs");
    }

    public ValueTask AddAsync(Chef chef, CancellationToken cancellationToken = default)
    {
        ChefDoc doc = ChefDoc.Create(chef);
        return new ValueTask(_collection.InsertOneAsync(doc, cancellationToken: cancellationToken));
    }

    public ValueTask<Chef?> GetByNameAsync(string name, CancellationToken ct = default)
    {
        var builder = new FilterDefinitionBuilder<ChefDoc>();
        FilterDefinition<ChefDoc> byName = builder.Eq(doc => doc.Name, name);

        return new ValueTask<Chef?>(
            _collection
            .Find(byName, s_findOptions)
            .Project(ChefProjectionDefinition())
            .FirstOrDefaultAsync(ct)!);
    }

    public ValueTask<Chef?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        var builder = new FilterDefinitionBuilder<ChefDoc>();
        FilterDefinition<ChefDoc> byEmail = builder.Eq(doc => doc.Email, email);

        return new ValueTask<Chef?>(
            _collection
            .Find(byEmail, s_findOptions)
            .Project(ChefProjectionDefinition())
            .FirstOrDefaultAsync(cancellationToken)!);
    }

    public ValueTask<IQueryable<Chef>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return new ValueTask<IQueryable<Chef>>(
            _collection
            .AsQueryable(s_aggregateOptions)
            .Select(s_asChef));
    }

    public ValueTask RemoveAsync(string chefname, CancellationToken cancellationToken = default)
    {
        return new ValueTask(_collection.DeleteOneAsync(chef => chef.Name == chefname, cancellationToken));
    }

    static ProjectionDefinition<ChefDoc, Chef> ChefProjectionDefinition()
    {
        return new ProjectionDefinitionBuilder<ChefDoc>()
            .Expression(doc => new Chef()
            {
                Id = new EntityId(doc.Id),
                CreatedAt = doc.CreatedAt,
                Email = doc.Email,
                Name = doc.Name,
                PasswordHash = doc.PasswordHash,
            });
    }

    static readonly Expression<Func<ChefDoc, Chef>> s_asChef = doc => new Chef()
    {

        Id = new EntityId(doc.Id),
        CreatedAt = doc.CreatedAt,
        Email = doc.Email,
        Name = doc.Name,
        PasswordHash = doc.PasswordHash,
    };
}
