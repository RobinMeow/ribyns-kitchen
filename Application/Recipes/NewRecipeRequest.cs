using Domain;

namespace Application.Recipes;

public sealed record NewRecipeRequest : Notification
{
    public string Name { get; set; } = null!;

    public Recipe ToRecipe()
    {
        System.Diagnostics.Debug.Assert(Name != null);
        return new Recipe()
        {
            Id = EntityId.New(),
            CreatedAt = DateTime.UtcNow,
            Name = Name!
        };
    }
}
