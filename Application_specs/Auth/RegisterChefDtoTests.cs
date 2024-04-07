using System.ComponentModel.DataAnnotations;
using Application.Auth;
using Common_specs;

namespace api.tests.Auth;

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

        IList<ValidationResult> validationResults = ValidationResults(dto);
        True(HasInvalidMember(validationResults, nameof(RegisterChefDto.Name)));
        True(HasInvalidMember(validationResults, nameof(RegisterChefDto.Password)));
        True(HasInvalidMember(validationResults, nameof(RegisterChefDto.Email)));
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

        Empty(ValidationResults(dto));
    }
}
