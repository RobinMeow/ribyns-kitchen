using System.ComponentModel.DataAnnotations;
using api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Recipes;

[Authorize]
[ApiController]
[Route("[controller]")]
public sealed class RecipeController(
    DbContext context,
    ILogger<RecipeController> logger
    ) : ControllerBase
{
    readonly ILogger<RecipeController> _logger = logger;
    readonly IRecipeRepository _recipeRepository = context.RecipeRepository;

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

        return TypedResults.Created(nameof(AddAsync), recipe.ToDto());
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
    /// <param name="cancellationToken"></param>
    /// <returns>all recipes.</returns>
    [HttpGet(nameof(GetAllAsync))]
    public async Task<Ok<IEnumerable<RecipeDto>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        IEnumerable<Recipe> recipe = await _recipeRepository.GetAllAsync(cancellationToken);
        IEnumerable<RecipeDto> recipeDtos = recipe.ToDto();
        return TypedResults.Ok(recipeDtos);
    }

    [HttpGet(nameof(GetAsync))]
    public async Task<Results<Ok<RecipeDto>, NotFound>> GetAsync([FromQuery] string recipeId, CancellationToken ct = default)
    // TODO ValidEntityId
    {
        ct.ThrowIfCancellationRequested();
        Recipe? recipe = await _recipeRepository.GetAsync(new EntityId(recipeId), ct);

        if (recipe == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(recipe.ToDto());
    }
}
