using Application;
using Application.Auth;
using Common.Validations;
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
        var requestDto = new RegisterChefRequest()
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

    [Fact]
    public async Task GetValidations_returns_OK()
    {
        Ok<Dictionary<string, FieldConstraints>> validations = await _authController.GetValidationsAsync();
        Equal(200, validations.StatusCode);
        NotNull(validations.Value);
        True(validations.Value.Count > 0);
    }
}
