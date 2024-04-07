using api.Controllers;
using api.Controllers.Auth;
using Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Logging;
using NSubstitute;

namespace Auth;

public sealed class AuthControllerTests
{
    readonly AuthController _authController;

    public AuthControllerTests()
    {
        IChefRepository chefRepository = Substitute.For<IChefRepository>();

        _authController = new AuthController(
            chefRepository,
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

        Results<
            Created<ChefDto>, 
            BadRequest<string>, 
            StatusCodeHttpResult> createdResult = await _authController.RegisterAsync(requestDto);

        IsType<Created<ChefDto>>(createdResult.Result);
    }

    [Fact]
    public async Task Register_throws_without_request_dto()
    {
        await ThrowsAnyAsync<NullReferenceException>(async () => await _authController.RegisterAsync(null!));
    }
}
