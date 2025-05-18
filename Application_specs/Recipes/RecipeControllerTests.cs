using Application.Recipes;
using Domain;
using Infrastructure.MongoDB;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Logging;
using NSubstitute;
using System.Linq.Expressions;

namespace Recipes;

public sealed class RecipeControllerTests
{
    readonly RecipeController _recipeController;
    readonly IRecipeCollection _recipeCollection = Substitute.For<IRecipeCollection>();
    readonly IRecipeRepository _recipeRepository = Substitute.For<IRecipeRepository>();

    public RecipeControllerTests()
    {
        _recipeController = new RecipeController(
            _recipeRepository,
            _recipeCollection,
            Substitute.For<ILogger<RecipeController>>()
        );
    }

    [Fact]
    public async Task AddAsync_returns_created_with_valid_request_dto()
    {
        var requestDto = new NewRecipeRequest()
        {
            Name = "My Recipe",
        };

        Results<BadRequest<NewRecipeRequest>, Created<RecipeDto>> createdResult = await _recipeController.AddAsync(requestDto);
        IsType<Created<RecipeDto>>(createdResult.Result);
        var actual = createdResult.Result as Created<RecipeDto>;
        NotNull(actual);
        NotNull(actual.Value);
        Equal("My Recipe", actual.Value.Name);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public async Task AddAsync_returns_BadReuqest_with_invalid_request_dto(string? title)
    {
        var requestDto = new NewRecipeRequest()
        {
            Name = title!,
        };

        Results<BadRequest<NewRecipeRequest>, Created<RecipeDto>> result = await _recipeController.AddAsync(requestDto);

        IsType<BadRequest<NewRecipeRequest>>(result.Result);
        var actual = result.Result as BadRequest<NewRecipeRequest>;

        NotNull(actual);
        NotNull(actual.Value);
        True(actual.Value.HasErrors());
    }

    [Fact]
    public async Task GetAllAsync_returns_Ok()
    {
        _ = _recipeCollection
            .GetAllAsync(Arg.Any<Expression<Func<RecipeDoc, RecipeDto>>>())
            .Returns(new ValueTask<IQueryable<RecipeDto>>(Enumerable.Empty<RecipeDto>().AsQueryable()));

        Ok<IQueryable<RecipeDto>> result = await _recipeController.GetAllAsync();
        NotNull(result);
        NotNull(result.Value);
    }

    [Fact]
    public async Task GetAsync_returns_NotFound()
    {
        Results<Ok<RecipeDto>, NotFound> result = await _recipeController.GetAsync(EntityId.New().ToString());
        IsType<NotFound>(result.Result);
    }

    [Fact]
    public async Task GetAsync_returns_MockResult()
    {
        Recipe recipe = new()
        {
            Id = EntityId.New(),
            Name = ""
        };

        RecipeDto dto = new()
        {
            Id = recipe.Id.ToString(),
            Name = "",
        };

        _recipeCollection
            .GetAsync(Arg.Is(recipe.Id.ToString()), Arg.Any<Expression<Func<RecipeDoc, RecipeDto>>>(), default)
            .Returns(new ValueTask<RecipeDto?>(dto));

        Results<Ok<RecipeDto>, NotFound> result = await _recipeController.GetAsync(recipe.Id.ToString());

        IsType<Ok<RecipeDto>>(result.Result);
        Ok<RecipeDto>? actual = (result.Result as Ok<RecipeDto>);
        NotNull(actual?.Value);
        Equal(recipe.Id.ToString(), actual.Value.Id);
    }

    [Fact]
    public async Task GetAsync_cancels_for_CancellationToken()
    {
        var source = new CancellationTokenSource();
        source.Cancel();
        await ThrowsAsync<OperationCanceledException>(() => _recipeController.GetAsync("", source.Token));
    }

    [Fact]
    public async Task AddAsync_cancels_for_CancellationToken()
    {
        var source = new CancellationTokenSource();
        source.Cancel();
        await ThrowsAsync<OperationCanceledException>(() => _recipeController.AddAsync(null!, source.Token));
    }

    [Fact]
    public async Task GetAllAsync_cancels_for_CancellationToken()
    {
        var source = new CancellationTokenSource();
        source.Cancel();
        await ThrowsAsync<OperationCanceledException>(() => _recipeController.GetAllAsync(source.Token));
    }
}
