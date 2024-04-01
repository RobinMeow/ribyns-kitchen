using api.Controllers;
using api.Controllers.Recipes;
using api.Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NSubstitute;

namespace Recipes;

public sealed class RecipeControllerTests
{
    readonly RecipeController _recipeController;
    readonly DbContext dbContext = Substitute.For<DbContext>();

    public RecipeControllerTests()
    {
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
            Title = "My Recipe",
        };

        ActionResult<RecipeDto> createdResult = await _recipeController.AddAsync(requestDto);
        IsType<CreatedResult>(createdResult.Result);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public async Task AddAsync_returns_BadReuqest_with_invalid_request_dto(string? title)
    {
        var requestDto = new NewRecipeDto()
        {
            Title = title!,
        };

        ActionResult<RecipeDto> result = await _recipeController.AddAsync(requestDto);
        
        IsType<BadRequestObjectResult>(result.Result);
        BadRequestObjectResult objectResult = (BadRequestObjectResult)result.Result;

        IsType<NewRecipeDto>(objectResult.Value);
        NotNull(objectResult.Value);

        NewRecipeDto dto = (NewRecipeDto)objectResult.Value;

        True(dto.HasErrors());
    }

    [Fact]
    public async Task GetAllAsync_returns_OkObject()
    {
        ActionResult<IEnumerable<RecipeDto>> result = await _recipeController.GetAllAsync();
        IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public async Task GetAsync_returns_NotFound()
    {
        ActionResult<RecipeDto> result = await _recipeController.GetAsync(EntityId.New().ToString());
        IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task GetAsync_returns_MockResult()
    {
        Recipe recipe = new Recipe()
        {
            Id = EntityId.New(),
            Title = ""
        };
        
        dbContext.RecipeRepository
            .GetAsync(Arg.Is(recipe.Id), default)
            .Returns(Task.FromResult(recipe) as Task<Recipe?>);

        ActionResult<RecipeDto> result = await _recipeController.GetAsync(recipe.Id.ToString());
        IsType<OkObjectResult>(result.Result);
        object? dto = ((OkObjectResult)result.Result).Value;
        NotNull(dto);
        IsType<RecipeDto>(dto);
        Equal(recipe.Id.ToString(), ((RecipeDto)dto).Id);
    }

    [Fact]
    public async Task GetAsync_cancels_for_CancelationToken()
    {
        var source = new CancellationTokenSource();
        source.Cancel();
        await ThrowsAsync<OperationCanceledException>(() => _recipeController.GetAsync("", source.Token));
    }

    [Fact]
    public async Task AddAsync_cancels_for_CancelationToken()
    {
        var source = new CancellationTokenSource();
        source.Cancel();
        await ThrowsAsync<OperationCanceledException>(() => _recipeController.AddAsync(null!, source.Token));
    }

    [Fact]
    public async Task GetAllAsync_cancels_for_CancelationToken()
    {
        var source = new CancellationTokenSource();
        source.Cancel();
        await ThrowsAsync<OperationCanceledException>(() => _recipeController.GetAllAsync(source.Token));
    }
}
