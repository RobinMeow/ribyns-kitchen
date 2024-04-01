using api.Domain;
using MongoDB.Driver;

namespace api.Infrastructure.MongoDB;

public sealed class RecipeCollection : IRecipeRepository
{
    readonly IMongoCollection<RecipeDoc> _collection;

    public RecipeCollection(IMongoDatabase database)
    {
        _collection = database.GetCollection<RecipeDoc>("recipes");
    }

    // TODO use ValueTask, as the code runs in sync anyways.
    public Task AddAsync(Recipe recipe, CancellationToken cancellationToken = default)
    {
        RecipeDoc doc = RecipeDoc.Create(recipe);
        return _collection.InsertOneAsync(doc, cancellationToken: cancellationToken);
    }

    public async Task<IEnumerable<Recipe>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find(_ => true)
            .Project(RecipeProjectionDefinition())
            .ToListAsync(cancellationToken) // TODO get rid of this and return the query
            .ConfigureAwait(false);
    }

    public Task<Recipe?> GetAsync(EntityId id, CancellationToken ct = default)
    {
        return _collection
            .Find(Builders<RecipeDoc>.Filter.Eq(x => x.Id, id))
            .Project(RecipeProjectionDefinition())
            .FirstOrDefaultAsync(ct) as Task<Recipe?>;
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
}
