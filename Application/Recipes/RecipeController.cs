using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using Domain;
using Infrastructure.MongoDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Application.Recipes;

[Authorize]
[ApiController]
[Route("[controller]")]
public sealed class RecipeController : ControllerBase
{
    public RecipeController(
        IRecipeRepository recipeRepository,
        IRecipeCollection recipeCollection,
        ILogger<RecipeController> logger
        ) : base()
    {
        _recipeRepository = recipeRepository;
        _recipeCollection = recipeCollection;
        _logger = logger;
    }

    readonly ILogger<RecipeController> _logger;
    readonly IRecipeRepository _recipeRepository;
    readonly IRecipeCollection _recipeCollection;

    readonly Func<Recipe, RecipeDto> _toDto = recipe => new RecipeDto()
    {
        Id = recipe.Id.Id,
        CreatedAt = recipe.CreatedAt,
        Name = recipe.Name,
    };

    readonly Expression<Func<RecipeDoc, RecipeDto>> _dtoProjection = doc => new RecipeDto()
    {
        Id = doc.Id,
        CreatedAt = doc.CreatedAt,
        Name = doc.Name,
    };

    /// <summary>Add a new recipe.</summary>
    /// <param name="newRecipe">The recipe to add.</param>
    /// <param name="ct"></param>
    /// <returns>The newly created recipe.</returns>
    [HttpPost(nameof(AddAsync))]
    public async Task<Results<BadRequest<NewRecipeRequest>, Created<RecipeDto>>> AddAsync(
        [Required] NewRecipeRequest newRecipe,
        CancellationToken ct = default)
    {
        ct.ThrowIfCancellationRequested();

        var newRecipeSpecification = new NewRecipeSpecification(newRecipe);
        if (!newRecipeSpecification.IsSatisfied())
            return TypedResults.BadRequest(newRecipe);

        Recipe recipe = newRecipe.ToRecipe();

        ct.ThrowIfCancellationRequested();
        await _recipeRepository.AddAsync(recipe, ct);

        return TypedResults.Created(nameof(AddAsync), _toDto(recipe));
    }

    [HttpGet(nameof(GetAllAsync))]
    public async Task<Ok<IQueryable<RecipeDto>>> GetAllAsync(CancellationToken ct = default)
    {
        ct.ThrowIfCancellationRequested();

        return TypedResults.Ok(await _recipeCollection.GetAllAsync(_dtoProjection, ct));
    }


    [HttpGet(nameof(GetAsync))] // TODO EntityIdAttribute
    public async Task<Results<Ok<RecipeDto>, NotFound>> GetAsync([FromQuery] string recipeId, CancellationToken ct = default)
    {
        ct.ThrowIfCancellationRequested();
        RecipeDto? recipe = await _recipeCollection.GetAsync(recipeId, _dtoProjection, ct);

        if (recipe == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(recipe);
    }
}
