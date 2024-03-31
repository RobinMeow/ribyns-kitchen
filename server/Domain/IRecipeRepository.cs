namespace api.Domain;

public interface IRecipeRepository
{
    Task AddAsync(Recipe recipe, CancellationToken cancellationToken = default);

    Task<Recipe?> GetAsync(EntityId id, CancellationToken ct = default);

    Task<IEnumerable<Recipe>> GetAllAsync(CancellationToken cancellationToken = default);
}
