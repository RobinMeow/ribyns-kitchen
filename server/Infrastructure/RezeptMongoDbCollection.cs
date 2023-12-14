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

	public Task AddAsync(Recipe recipe)
	{
		return _collection.InsertOneAsync(recipe);
	}

	public async Task<IEnumerable<Recipe>> GetAllAsync()
	{
        return await _collection
            .Find<Recipe>(_ => true)
            .ToListAsync();
	}
}
