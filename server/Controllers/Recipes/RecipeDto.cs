using System.ComponentModel.DataAnnotations;
using api.Domain;

namespace api.Controllers.Recipes;

public sealed class RecipeDto : EntityDto
{
    [Required]
    public override int ModelVersion { get; init; } = Domain.Recipe.MODEL_VERSION;

    [Required]
    [StringRange(RecipeValidators.NAME_MIN_LENGTH, RecipeValidators.NAME_MAX_LENGTH)]
    // bard failed to give me a recipe name above 120 characters: it gave me "Authentisches bayerisches Schweinebraten mit köstlicher Dunkelbiersoße, aromatischem Kartoffelpüree und knackigem Rotkohl"
    // but if you remove the authentic and the aromatic words, it ends up beloew 120 :) And there are more unessarcy, undescrptive words once could remove
    public string Name { get; set; } = null!;
}
