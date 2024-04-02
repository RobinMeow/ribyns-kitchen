using api.Domain;

namespace api.Infrastructure.MongoDB
{
    public interface IRecipeCollection
    {
        ValueTask AddAsync(Recipe recipe, CancellationToken cancellationToken = default);
        ValueTask<IQueryable<Recipe>> GetAllAsync(CancellationToken cancellationToken = default);
        ValueTask<Recipe?> GetAsync(EntityId entityId, CancellationToken ct = default);
    }
}