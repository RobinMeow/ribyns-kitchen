using System.ComponentModel.DataAnnotations;
using Domain;

namespace api.Controllers.Recipes;

public sealed class NewRecipeDto : Notification
{
    [Required]
    [StringRange(RecipeValidators.TITLE_MIN_LENGTH, RecipeValidators.TITLE_MAX_LENGTH)]
    public string Title { get; set; } = null!;
}
