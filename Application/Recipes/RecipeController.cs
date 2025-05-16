using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using Common.Validations;
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

    /// <summary>add a new recipe.</summary>
    /// <param name="newRecipe">the recipe to add.</param>
    /// <param name="cancellationToken"></param>
    /// <returns>the newly created recipe.</returns>
    [HttpPost(nameof(AddAsync))]
    public async Task<Results<BadRequest<NewRecipeRequest>, Created<RecipeDto>>> AddAsync([Required] NewRecipeRequest newRecipe, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var newRecipeSpecification = new NewRecipeSpecification(newRecipe);
        if (!newRecipeSpecification.IsSatisfied())
            return TypedResults.BadRequest(newRecipe);

        Recipe recipe = newRecipe.ToRecipe();

        cancellationToken.ThrowIfCancellationRequested();
        await _recipeRepository.AddAsync(recipe, cancellationToken);

        return TypedResults.Created(nameof(AddAsync), _toDto(recipe));
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

    [HttpGet(nameof(GetValidations))]
    public Task<Ok<Dictionary<string, FieldConstraints>>> GetValidations(CancellationToken ct = default)
    {
        ct.ThrowIfCancellationRequested();

        return Task.FromResult(TypedResults.Ok(new ValidationsBuilder()
            .AddField(nameof(NewRecipeRequest.Name))
            .Required()
            .Min(RecipeValidations.NAME_MIN_LENGTH)
            .Max(RecipeValidations.NAME_MAX_LENGTH)
            .Build()));
    }
}
