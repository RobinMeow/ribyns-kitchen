using api.Controllers.Recipes;
using System.ComponentModel.DataAnnotations;

namespace api.tests.Recipes;

public sealed class RecipeDtoTests : DataAnnotationTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("1")]
    [InlineData("This recipe name is too long. Above 120 chars. 0123456798012345679801234567980123456798012345679801234567980123456798012345679801234567980123456798")]
    public void fails_all_member_validations(string? title)
    {
        var dto = new RecipeDto()
        {
            Title = title!,
        };

        IList<ValidationResult> validationResults = ValidationResults(dto);
        True(HasInvalidMember(validationResults, nameof(RecipeDto.Title)));
    }

    [Theory]
    [InlineData("Sauerteig")]
    [InlineData("Sauerteig nach biblischer Art")]
    [InlineData("Sumptuous Southern-Style Pulled Pork BBQ with Aromatics, Sweet and Tangy Sauce, and a Twist of Creole Spice")] // 107
    public void successfully_validates_all_members(string title)
    {
        var dto = new RecipeDto()
        {
            Title = title,
        };

        Empty(ValidationResults(dto));
    }
}
