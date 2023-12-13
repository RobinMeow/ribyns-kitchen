using api.Controllers.Recipes;

namespace server.tests.Recipes;

public sealed class NewRecipeDtoTests : DataAnnotationTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public void fails_all_member_validations(string? name)
    {
        var dto = new NewRecipeDto()
        {
            Name = name!,
        };

        Equal(1, ValidateAmountFailed(dto));
    }

    [Theory]
    [InlineData("12")] // I dont know a recipe with two characters actually..
    [InlineData("Sumptuous Southern-Style Pulled Pork BBQ with Aromatics, Sweet and Tangy Sauce, and a Twist of Creole Spice")] // 107
    public void successfully_validates_all_members(string name)
    {
        var dto = new NewRecipeDto()
        {
            Name = name,
        };

        Equal(0, ValidateAmountFailed(dto));
    }
}
