using Domain;

namespace Application.Recipes;

/// <summary>
/// Uses the <see cref="RecipeValidations" /> to ensure the data is valid. Adds ErrorMessages to the DTO accordingly. Returns true when it contains invalid data.
/// </summary>
public sealed class NewRecipeSpecification
{
    readonly NewRecipeRequest _newRecipe;

    public NewRecipeSpecification(NewRecipeRequest newRecipe)
    {
        _newRecipe = newRecipe;
    }

    /// <summary>Validates the fields and returns true if the data is valid.</summary>
    public bool IsSatisfied()
    {
        ValidateName(_newRecipe.Name);

        return !_newRecipe.HasErrors();
    }

    void ValidateName(string? name)
    {
        string fieldName = nameof(NewRecipeRequest.Name);
        if (name == null)
            _newRecipe.AddErrorMessage($"{fieldName} is required.");
        else if (name.Length < RecipeValidations.NAME_MIN_LENGTH)
            _newRecipe.AddErrorMessage($"{fieldName} has to be greater than {RecipeValidations.NAME_MIN_LENGTH - 1}.");
        else if (name.Length > RecipeValidations.NAME_MAX_LENGTH)
            _newRecipe.AddErrorMessage($"{fieldName} has to be less than {RecipeValidations.NAME_MAX_LENGTH + 1}.");
    }
}
