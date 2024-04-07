namespace api.Domain;

public interface IRecipeRepository
{
    ValueTask AddAsync(Recipe recipe, CancellationToken ct = default);
}
