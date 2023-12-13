namespace api.Domain;

public interface IRecipeRepository
{
    Task AddAsync(Recipe recipe);
    Task<IEnumerable<Recipe>> GetAllAsync();
}
