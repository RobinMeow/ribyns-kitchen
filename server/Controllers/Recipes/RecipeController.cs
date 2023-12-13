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
    ) : GkbController
{
    readonly ILogger<RecipeController> _logger = logger;
    readonly IRecipeRepository _recipeRepository = _context.RecipeRepository;

    [HttpPost(nameof(AddAsync))]
    [ProducesResponseType<RecipeDto>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IResult> AddAsync([Required] NewRecipeDto newRecipe)
    {
        try
        {
            var newRecipeSpecification = new NewRecipeSpecification(newRecipe);
            if (!newRecipeSpecification.IsSatisfied())
                return Results.BadRequest();

            Recipe recipe = Create(newRecipe);
            await _recipeRepository.AddAsync(recipe);

            return Results.Created(string.Empty, recipe.ToDto()); // ToDo: Use CreatedAt, to msomehow make use of id creation in back end. and eable front end navigation
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, CreateErrorMessage(nameof(RecipeController), nameof(AddAsync)), newRecipe);
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
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
    public async ValueTask<IActionResult> GetAllAsync()
    {
        try
        {
            IEnumerable<Recipe> recipe = await _recipeRepository.GetAllAsync();
            return Ok(recipe.ToDto());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, CreateErrorMessage(nameof(RecipeController), nameof(GetAllAsync)));
            return Status_500_Internal_Server_Error;
        }
    }
}
