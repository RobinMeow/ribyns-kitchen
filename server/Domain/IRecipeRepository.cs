namespace api.Domain;

public interface IRecipeRepository
{
    ValueTask AddAsync(Recipe recipe, CancellationToken cancellationToken = default);

    ValueTask<Recipe?> GetAsync(EntityId id, CancellationToken ct = default);

    ValueTask<IEnumerable<Recipe>> GetAllAsync(CancellationToken cancellationToken = default);
}
