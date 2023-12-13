using api.Controllers.Auth;

namespace server.tests.Auth;

public sealed class RegisterChefDtoTests : DataAnnotationTests
{
    [Theory]
    [InlineData("", "", "")]
    [InlineData("This name is waaaaay tooo looong", "1", "invalidEmail")]
    public void fails_all_member_validations(string name, string password, string? email)
    {
        var dto = new RegisterChefDto()
        {
            Name = name,
            Password = password,
            Email = email
        };

        Equal(3, ValidateAmountFailed(dto));
    }

    [Theory]
    [InlineData("Weinberg des Herrn", "iLoveJesus<3!", "be.blessed@nd.loved")]
    [InlineData("Weinberg des Herrn", "iLoveJesus<3!", null)]
    public void successfully_validates_all_members(string name, string password, string? email)
    {
        var dto = new RegisterChefDto()
        {
            Name = name,
            Password = password,
            Email = email
        };

        Equal(0, ValidateAmountFailed(dto));
    }
}
