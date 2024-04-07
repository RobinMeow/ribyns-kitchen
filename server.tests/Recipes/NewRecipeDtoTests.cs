using api.Controllers.Recipes;
using Common_specs;
using System.ComponentModel.DataAnnotations;

namespace api.tests.Recipes;

public sealed class NewRecipeDtoTests : DataAnnotationTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public void fails_all_member_validations(string? title)
    {
        var dto = new NewRecipeDto()
        {
            Title = title!,
        };

        IList<ValidationResult> validationResults = ValidationResults(dto);
        True(HasInvalidMember(validationResults, nameof(NewRecipeDto.Title)));
    }

    [Theory]
    [InlineData("Egg")]
    [InlineData("Sumptuous Southern-Style Pulled Pork BBQ with Aromatics, Sweet and Tangy Sauce, and a Twist of Creole Spice")] // 107
    public void successfully_validates_all_members(string name)
    {
        var dto = new NewRecipeDto()
        {
            Title = name,
        };

        Empty(ValidationResults(dto));
    }
}
