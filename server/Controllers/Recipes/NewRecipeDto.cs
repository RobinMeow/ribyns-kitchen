using System.ComponentModel.DataAnnotations;
using api.Domain;

namespace api.Controllers.Recipes;

public sealed class NewRecipeDto : Notification
{
    [Required]
    [StringRange(RecipeValidators.NAME_MIN_LENGTH, RecipeValidators.NAME_MAX_LENGTH)]
    public string Name { get; set; } = null!;
}
