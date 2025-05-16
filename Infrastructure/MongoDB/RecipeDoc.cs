using Domain;

namespace Infrastructure.MongoDB;

public sealed record RecipeDoc : Document
{
    public const ushort MODEL_VERSION = 0;

    public override ushort ModelVersion { get; set; } = MODEL_VERSION;

    public required string Name { get; set; }

    public static RecipeDoc Create(Recipe recipe)
    {
        return new RecipeDoc()
        {
            Id = recipe.Id.ToString(),
            Name = recipe.Name,
            CreatedAt = recipe.CreatedAt,
        };
    }
}
