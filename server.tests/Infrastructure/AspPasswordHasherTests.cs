using api.Domain;
using api.Infrastructure;
using Microsoft.AspNetCore.Identity;

namespace server.tests.Infrastructure;

public sealed class AspPasswordHasherTests
{
    readonly Chef _chef = new ("Chef", EntityId.New());

    public AspPasswordHasherTests()
    {
        
    }
    [Fact]
    public void returns_non_null_string()
    {
        // Arrange
        var aspPasswordHasher = new AspPasswordHasher();
        var password = "iLoveJesus<3!";

        // Act
        var hashedPassword = aspPasswordHasher.Hash(_chef, password);

        // Assert
        NotNull(hashedPassword);
    }

    [Fact]
    public void returns_true_for_correct_password()
    {
        // Arrange
        var aspPasswordHasher = new AspPasswordHasher();
        var password = "iLoveJesus<3!";
        var hashedPassword = aspPasswordHasher.Hash(_chef, password);

        // Act
        var verificationResult = aspPasswordHasher.VerifyHashedPassword(_chef, hashedPassword, password);

        // Assert
        Equal(PasswordVerificationResult.Success, verificationResult);
    }

    [Fact]
    public void returns_false_for_incorrect_password()
    {
        // Arrange
        var aspPasswordHasher = new AspPasswordHasher();
        var password = "iLoveJesus<3!";
        var hashedPassword = aspPasswordHasher.Hash(_chef, password);

        // Act
        var verificationResult = aspPasswordHasher.VerifyHashedPassword(_chef, hashedPassword, "wrongPassword");

        // Assert
        Equal(PasswordVerificationResult.Failed, verificationResult);
    }
}
