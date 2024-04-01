using System.ComponentModel.DataAnnotations;
using api.Domain;

namespace api.Controllers.Recipes;

public sealed class RecipeDto : EntityDto
{
    [Required]
    [StringRange(RecipeValidators.TITLE_MIN_LENGTH, RecipeValidators.TITLE_MAX_LENGTH)]
    // bard failed to give me a recipe name above 120 characters: it gave me "Authentisches bayerisches Schweinebraten mit köstlicher Dunkelbiersoße, aromatischem Kartoffelpüree und knackigem Rotkohl"
    // but if you remove the authentic and the aromatic words, it ends up beloew 120 :) And there are more unessarcy, undescrptive words once could remove
    public string Title { get; set; } = null!;
}
