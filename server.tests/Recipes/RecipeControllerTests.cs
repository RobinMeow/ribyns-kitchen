using api.Controllers.Recipes;
using api.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Logging;
using NSubstitute;

namespace Recipes;

public sealed class RecipeControllerTests
{
    readonly RecipeController _recipeController;

    public RecipeControllerTests()
    {
        DbContext dbContext = Substitute.For<DbContext>();

        _recipeController = new RecipeController(
            dbContext,
            Substitute.For<ILogger<RecipeController>>()
        );
    }

    [Fact]
    public async Task AddAsync_returns_created_with_valid_request_dto()
    {
        var requestDto = new NewRecipeDto()
        {
            Name = "My Recipe",
        };

        IResult createdResult = await _recipeController.AddAsync(requestDto);
        IsAssignableFrom<Created<RecipeDto>>(createdResult);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public async Task AddAsync_returns_BadReuqest_with_invalid_request_dto(string? name)
    {
        var requestDto = new NewRecipeDto()
        {
            Name = name!,
        };

        IResult result = await _recipeController.AddAsync(requestDto);
        IsAssignableFrom<BadRequest>(result);
    }
}
