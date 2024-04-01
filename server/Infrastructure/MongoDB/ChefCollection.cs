using api.Domain;
using MongoDB.Driver;

namespace api.Infrastructure.MongoDB;

public sealed class ChefCollection : IChefRepository
{
    readonly IMongoCollection<ChefDoc> _collection;

    public ChefCollection(IMongoDatabase database)
    {
        _collection = database.GetCollection<ChefDoc>("chefs");
    }

    public Task AddAsync(Chef chef, CancellationToken cancellationToken = default)
    {
        ChefDoc doc = ChefDoc.Create(chef);
        return _collection.InsertOneAsync(doc, cancellationToken: cancellationToken);
    }

    public Task<Chef?> GetByNameAsync(string name, CancellationToken ct = default)
    {
        var builder = new FilterDefinitionBuilder<ChefDoc>();
        FilterDefinition<ChefDoc> byName = builder.Eq(doc => doc.Name, name);

        return _collection
            .Find(byName)
            .Project(ChefProjectionDefinition())
            .FirstOrDefaultAsync(ct) as Task<Chef?>;
    }

    public Task<Chef?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        var builder = new FilterDefinitionBuilder<ChefDoc>();
        FilterDefinition<ChefDoc> byEmail = builder.Eq(doc => doc.Email, email);

        return _collection
            .Find(byEmail)
            .Project(ChefProjectionDefinition())
            .FirstOrDefaultAsync(cancellationToken) as Task<Chef?>;
    }

    public async Task<IEnumerable<Chef>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find(_ => true)
            .Project(ChefProjectionDefinition())
            .ToListAsync(cancellationToken)
            .ConfigureAwait(false);
    }

    public Task<Chef> GetAsync(string name, CancellationToken cancellationToken = default)
    {
        return _collection
            .Find(chef => chef.Name == name)
            .Project(ChefProjectionDefinition())
            .SingleOrDefaultAsync(cancellationToken);
    }

    public Task RemoveAsync(string chefname, CancellationToken cancellationToken = default)
    {
        return _collection.DeleteOneAsync(chef => chef.Name == chefname, cancellationToken);
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
}
