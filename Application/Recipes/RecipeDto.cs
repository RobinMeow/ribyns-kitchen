namespace Application.Recipes;

public sealed record RecipeDto : EntityDto
{
    public string Title { get; init; } = null!;
}
