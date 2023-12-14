using System.ComponentModel.DataAnnotations;
using api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Recipes;

[Authorize]
[ApiController]
[Route("[controller]")]
public sealed class RecipeController(
    DbContext _context,
    ILogger<RecipeController> logger
    ) : CcController
{
    readonly ILogger<RecipeController> _logger = logger;
    readonly IRecipeRepository _recipeRepository = _context.RecipeRepository;

    /// <summary>add a new recipe.</summary>
    /// <param name="newRecipe">the recipe to add.</param>
    /// <param name="cancellationToken"></param>
    /// <returns>the newly created recipe.</returns>
    [HttpPost(nameof(AddAsync))]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<RecipeDto>> AddAsync([Required] NewRecipeDto newRecipe, CancellationToken cancellationToken = default)
    {
        try
        {
            var newRecipeSpecification = new NewRecipeSpecification(newRecipe);
            if (!newRecipeSpecification.IsSatisfied())
                return BadRequest();

            Recipe recipe = Create(newRecipe);
            await _recipeRepository.AddAsync(recipe, cancellationToken);

            return Created(string.Empty, recipe.ToDto()); // ToDo: Use CreatedAt, to msomehow make use of id creation in back end. and eable front end navigation
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, CreateErrorMessage(nameof(RecipeController), nameof(AddAsync)), newRecipe);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    static Recipe Create(NewRecipeDto newRecipe)
    {
        System.Diagnostics.Debug.Assert(newRecipe.Name != null);
        return new Recipe()
        {
            CreatedAt = IsoDateTime.Now,
            Name = newRecipe.Name!
        };
    }

    /// <summary>retrive all recipes.</summary>
    /// <param name="cancellationToken"></param>
    /// <returns>all recipes.</returns>
    [HttpGet(nameof(GetAllAsync))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<IEnumerable<RecipeDto>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            IEnumerable<Recipe> recipe = await _recipeRepository.GetAllAsync(cancellationToken);
            IEnumerable<RecipeDto> recipeDtos = recipe.ToDto();
            return Ok(recipeDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, CreateErrorMessage(nameof(RecipeController), nameof(GetAllAsync)));
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
