using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using api.Domain;
using api.Infrastructure.MongoDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Recipes;

[Authorize]
[ApiController]
[Route("[controller]")]
public sealed class RecipeController(
    IRecipeRepository recipeRepository,
    IRecipeCollection recipeCollection,
    ILogger<RecipeController> logger
    ) : ControllerBase
{
    readonly ILogger<RecipeController> _logger = logger;
    readonly IRecipeRepository _recipeRepository = recipeRepository;
    readonly IRecipeCollection _recipeCollection = recipeCollection;

    readonly Func<Recipe, RecipeDto> _toDto = recipe => new RecipeDto()
    {
        Id = recipe.Id.Id,
        CreatedAt = recipe.CreatedAt,
        Title = recipe.Title,
    };

    readonly Expression<Func<RecipeDoc, RecipeDto>> _dtoProjection = doc => new RecipeDto()
    {
        Id = doc.Id,
        CreatedAt = doc.CreatedAt,
        Title = doc.Title,
    };

    /// <summary>add a new recipe.</summary>
    /// <param name="newRecipe">the recipe to add.</param>
    /// <param name="cancellationToken"></param>
    /// <returns>the newly created recipe.</returns>
    [HttpPost(nameof(AddAsync))]
    public async Task<Results<BadRequest<NewRecipeDto>, Created<RecipeDto>>> AddAsync([Required] NewRecipeDto newRecipe, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var newRecipeSpecification = new NewRecipeSpecification(newRecipe);
        if (!newRecipeSpecification.IsSatisfied())
            return TypedResults.BadRequest(newRecipe);

        Recipe recipe = Create(newRecipe);

        cancellationToken.ThrowIfCancellationRequested();
        await _recipeRepository.AddAsync(recipe, cancellationToken);

        return TypedResults.Created(nameof(AddAsync), _toDto(recipe));
    }

    static Recipe Create(NewRecipeDto newRecipe)
    {
        System.Diagnostics.Debug.Assert(newRecipe.Title != null);
        return new Recipe()
        {
            Id = EntityId.New(),
            CreatedAt = DateTime.UtcNow,
            Title = newRecipe.Title!
        };
    }

    /// <summary>retrieve all recipes.</summary>
    /// <param name="ct"></param>
    /// <returns>all recipes.</returns>
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
        // TODO consider using nullable return type, instead of NotFound
        RecipeDto? recipe = await _recipeCollection.GetAsync(recipeId, _dtoProjection, ct);

        if (recipe == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(recipe);
    }
}
