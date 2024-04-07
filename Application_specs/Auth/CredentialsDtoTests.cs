using Application.Auth;
using Common_specs;
using System.ComponentModel.DataAnnotations;

namespace api.tests.Auth;

public sealed class CredentialsDtoTests : DataAnnotationTests
{
    [Theory]
    [InlineData("", "")]
    [InlineData(null, null)]
    public void fails_all_member_validations(string? name, string? password)
    {
        var dto = new CredentialsDto()
        {
            Name = name!,
            Password = password!,
        };

        IList<ValidationResult> validationResults = ValidationResults(dto);
        True(HasInvalidMember(validationResults, nameof(CredentialsDto.Name)));
        True(HasInvalidMember(validationResults, nameof(CredentialsDto.Password)));
    }

    [Fact]
    public void successfully_validates_all_members()
    {
        var dto = new CredentialsDto()
        {
            Name = "meow",
            Password = "meow",
        };

        Empty(ValidationResults(dto));
    }
}
