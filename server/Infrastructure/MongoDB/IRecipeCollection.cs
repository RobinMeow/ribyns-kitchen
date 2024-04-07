using System.Linq.Expressions;

namespace api.Infrastructure.MongoDB;

public interface IRecipeCollection
{
    ValueTask<T?> GetAsync<T>(string recipeId, Expression<Func<RecipeDoc, T>> projection, CancellationToken ct = default);

    ValueTask<IQueryable<T>> GetAllAsync<T>(Expression<Func<RecipeDoc, T>> projection, CancellationToken ct = default);
}
