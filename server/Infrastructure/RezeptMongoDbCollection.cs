using api.Domain;
using MongoDB.Driver;

namespace api.Infrastructure;

public sealed class RecipeMongoDbCollection : IRecipeRepository
{
	readonly IMongoCollection<Recipe> _collection;

	public RecipeMongoDbCollection(IMongoDatabase database)
	{
		_collection = database.GetCollection<Recipe>("recipes");
	}

	public Task AddAsync(Recipe recipe, CancellationToken cancellationToken = default)
	{
        return _collection.InsertOneAsync(recipe, cancellationToken: cancellationToken);
	}

	public async Task<IEnumerable<Recipe>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find<Recipe>(_ => true)
            .ToListAsync(cancellationToken).ConfigureAwait(false);
	}
}
