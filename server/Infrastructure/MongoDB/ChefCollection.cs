using api.Domain;
using MongoDB.Driver;

namespace api.Infrastructure.MongoDB;

public sealed class ChefCollection : IChefRepository
{
    readonly IMongoCollection<Chef> _collection;

    public ChefCollection(IMongoDatabase database)
    {
        _collection = database.GetCollection<Chef>("chefs");
    }

    public Task AddAsync(Chef chef, CancellationToken cancellationToken = default)
    {
        return _collection.InsertOneAsync(chef, cancellationToken: cancellationToken);
    }

    public async Task<Chef?> GetByNameAsync(string name, CancellationToken cancellationToken = default)
    {
        IAsyncCursor<Chef> asyncCursor = await _collection
            .FindAsync((chef) => chef.Name == name,
            cancellationToken: cancellationToken)
            .ConfigureAwait(false);

        return await asyncCursor.FirstOrDefaultAsync(cancellationToken)
            .ConfigureAwait(false);
    }

    public async Task<Chef?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        IAsyncCursor<Chef> asyncCursor = await _collection
            .FindAsync((chef) => chef.Email == email,
            cancellationToken: cancellationToken)
            .ConfigureAwait(false);

        return await asyncCursor.FirstOrDefaultAsync(cancellationToken)
            .ConfigureAwait(false);
    }

    public async Task<IEnumerable<Chef>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find(_ => true)
            .ToListAsync(cancellationToken)
            .ConfigureAwait(false);
    }

    public Task<Chef> GetAsync(string name, CancellationToken cancellationToken = default)
    {
        return _collection
            .Find(chef => chef.Name == name)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public Task RemoveAsync(string chefname, CancellationToken cancellationToken = default)
    {
        return _collection.DeleteOneAsync(chef => chef.Name == chefname, cancellationToken);
    }
}
