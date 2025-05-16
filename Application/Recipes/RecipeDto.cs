namespace Application.Recipes;

public sealed record RecipeDto : EntityDto
{
    public string Name { get; init; } = null!;
}
