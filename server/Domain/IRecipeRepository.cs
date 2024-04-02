namespace api.Domain;

public interface IRecipeRepository
{
    ValueTask AddAsync(Recipe recipe, CancellationToken cancellationToken = default);

    ValueTask<Recipe?> GetAsync(EntityId id, CancellationToken ct = default);

    ValueTask<IQueryable<Recipe>> GetAllAsync(CancellationToken cancellationToken = default);
}
