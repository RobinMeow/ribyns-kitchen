using api.Controllers;

namespace server.tests;

public sealed class ChefDtoTests : DataAnnotationTests
{
    [Theory]
    [InlineData("", "")]
    [InlineData(null, "")]
    public void fails_all_member_validations(string? name, string? email)
    {
        var dto = new ChefDto()
        {
            Name = name!,
            Email = email
        };

        Equal(2, ValidateAmountFailed(dto));
    }

    [Theory]
    [InlineData("Weinberg des Herrn", "be.blessed@nd.loved")]
    [InlineData("Weinberg des Herrn", null)]
    public void successfully_validates_all_members(string name, string? email)
    {
        var dto = new ChefDto()
        {
            Name = name,
            Email = email
        };

        Equal(0, ValidateAmountFailed(dto));
    }
}
