using System.ComponentModel.DataAnnotations;
using api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace api.Controllers.Recipes;

[Authorize]
[ApiController]
[Route("[controller]")]
public sealed class RecipeController(
    DbContext _context,
    ILogger<RecipeController> logger
    ) : GkbController
{
    readonly ILogger<RecipeController> _logger = logger;
    readonly IRecipeRepository _recipeRepository = _context.RecipeRepository;

    [HttpPost(nameof(AddAsync))]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<RecipeDto>> AddAsync([Required] NewRecipeDto newRecipe)
    {
        try
        {
            var newRecipeSpecification = new NewRecipeSpecification(newRecipe);
            if (!newRecipeSpecification.IsSatisfied())
                return BadRequest();

            Recipe recipe = Create(newRecipe);
            await _recipeRepository.AddAsync(recipe);

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
        return new Recipe(EntityId.New())
        {
            CreatedAt = IsoDateTime.Now,
            Name = newRecipe.Name!
        };
    }

    [HttpGet(nameof(GetAllAsync))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<IEnumerable<RecipeDto>>> GetAllAsync()
    {
        try
        {
            IEnumerable<Recipe> recipe = await _recipeRepository.GetAllAsync();
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
