using api.Domain;
using MongoDB.Driver;

namespace api.Infrastructure;

public sealed class ChefMongoDbCollection : IChefRepository
{
    readonly IMongoCollection<Chef> _collection;

    public ChefMongoDbCollection(IMongoDatabase database)
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
            .FindAsync((Chef chef) => chef.Name == name,
            cancellationToken: cancellationToken);
        return await asyncCursor.FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<Chef?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        IAsyncCursor<Chef> asyncCursor = await _collection
            .FindAsync((Chef chef) => chef.Email == email,
            cancellationToken: cancellationToken);
        return await asyncCursor.FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IEnumerable<Chef>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return await _collection
            .Find<Chef>(_ => true)
            .ToListAsync(cancellationToken);
    }

    public Task<Chef> GetAsync(string name, CancellationToken cancellationToken = default)
    {
        return _collection
            .Find<Chef>(chef => chef.Name == name)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public Task RemoveAsync(string chefname, CancellationToken cancellationToken = default)
    {
        return _collection.DeleteOneAsync(chef => chef.Name == chefname, cancellationToken);
    }
}
