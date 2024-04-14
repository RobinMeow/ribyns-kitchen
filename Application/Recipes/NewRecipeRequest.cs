namespace Application.Recipes;

public sealed record NewRecipeRequest : Notification
{
    public string Title { get; set; } = null!;
}
