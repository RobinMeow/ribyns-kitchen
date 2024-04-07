using System.Linq.Expressions;
using Domain;
using MongoDB.Driver;

namespace Infrastructure.MongoDB;

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

    public ValueTask<T?> GetAsync<T>(string recipeId, Expression<Func<RecipeDoc, T>> projection, CancellationToken ct = default)
    {
        Task<T> query = _collection
            .Find(Builders<RecipeDoc>.Filter.Eq(x => x.Id, recipeId), s_findOptions)
            .Project(projection)
            .FirstOrDefaultAsync(ct);

        return new ValueTask<T?>(query!);
    }

    public ValueTask<IQueryable<T>> GetAllAsync<T>(Expression<Func<RecipeDoc, T>> projection, CancellationToken ct = default)
    {
        IQueryable<T> query = _collection
           .AsQueryable()
           .Select(projection);

        return new ValueTask<IQueryable<T>>(query);
    }
}
