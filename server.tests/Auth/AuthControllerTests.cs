using api.Controllers.Auth;
using api.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NSubstitute;

namespace Auth;

public sealed class AuthControllerTests
{
    readonly AuthController _authController;

    public AuthControllerTests()
    {
        DbContext dbContext = Substitute.For<DbContext>();

        _authController = new AuthController(
            dbContext,
            Substitute.For<ILogger<AuthController>>(),
            Substitute.For<IPasswordHasher>(),
            Substitute.For<IJwtFactory>()
        );
    }

    [Fact]
    public async Task Register_returns_created_with_valid_request_dto()
    {
        var requestDto = new RegisterChefDto()
        {
            Name = "Robin",
            Password = "Password"
        };

        IActionResult createdResult = await _authController.RegisterAsync(requestDto);
        IsAssignableFrom<CreatedResult>(createdResult);
    }

    [Fact]
    public async Task Register_throws_without_request_dto()
    {
        await ThrowsAnyAsync<NullReferenceException>(async () => await _authController.RegisterAsync(null!));
    }
}
