using System.ComponentModel.DataAnnotations;
using api.Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Auth;

[ApiController]
[Route("[controller]")]
public sealed class AuthController(
    DbContext context,
    ILogger<AuthController> logger,
    IPasswordHasher passwordHasher,
    IJwtFactory jwtFactory
    ) : ControllerBase
{
    readonly IChefRepository _chefRepository = context.ChefRepository;
    readonly ILogger<AuthController> _logger = logger;
    readonly IPasswordHasher _passwordHasher = passwordHasher;
    readonly IJwtFactory _jwtFactory = jwtFactory;

    /// <summary>sign up a new account.</summary>
    /// <param name="newChef">the data to create an account from.</param>
    /// <param name="cancellationToken"></param>
    [HttpPost(nameof(RegisterAsync))]
    [ProducesResponseType<ChefDto>(StatusCodes.Status201Created)]
    public async Task<Results<Created<ChefDto>, BadRequest, BadRequest<string>, StatusCodeHttpResult>> RegisterAsync([Required] RegisterChefDto newChef, CancellationToken cancellationToken = default)
    {
        string chefname = newChef.Name;

        cancellationToken.ThrowIfCancellationRequested();
        Chef? chefWithSameName = await _chefRepository.GetByNameAsync(chefname, cancellationToken);

        if (chefWithSameName != null)
            return TypedResults.BadRequest($"Chefname ist bereits vergeben.");

        if (newChef.Email != null)
        {
            cancellationToken.ThrowIfCancellationRequested();
            Chef? chefWithSameEmail = await _chefRepository.GetByEmailAsync(newChef.Email, cancellationToken);

            if (chefWithSameEmail != null)
                return TypedResults.BadRequest($"Email ist bereits vergeben.");
        }

        var chef = new Chef()
        {
            Name = chefname,
            Email = newChef.Email
        };
            
        chef.SetPassword(newChef.Password, _passwordHasher);

        cancellationToken.ThrowIfCancellationRequested();
        await _chefRepository.AddAsync(chef, cancellationToken);

        string? uri = null;
        return TypedResults.Created(uri, new ChefDto
        {
            Id = chef.Id,
            Email = chef.Email,
            CreatedAt = chef.CreatedAt,
            ModelVersion = chef.ModelVersion
        });
    }

    /// <summary>log in using an existing account.</summary>
    /// <param name="credentials">credentials to check against and generate a JWT from.</param>
    /// <param name="cancellationToken"></param>
    /// <returns>a JWT for client side usage to keep the user logged in over a longer period of time.</returns>
    [HttpPost(nameof(LoginAsync))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<string>> LoginAsync([Required] CredentialsDto credentials, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        Chef? chef = await _chefRepository.GetByNameAsync(credentials.Name, cancellationToken);

        if (chef == null)
        {
            return BadRequest("Benutzer existiert nicht.");
        }

        PasswordVerificationResult passwordVerificationResult = _passwordHasher.VerifyHashedPassword(chef.PasswordHash, credentials.Password);

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            return BadRequest("Falsches Passwort.");
        }

        string token = _jwtFactory.Create(chef);

        return Ok(token);
    }

    /// <summary>delete an existing account.</summary>
    /// <param name="credentials">the credentials to check against which account to delete and if the provided password matches the account.</param>
    /// <param name="cancellationToken"></param>
    [HttpPost(nameof(DeleteAsync))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesDefaultResponseType]
    public async Task<IActionResult> DeleteAsync([Required] CredentialsDto credentials, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        Chef? chef = await _chefRepository.GetByNameAsync(credentials.Name, cancellationToken);

        if (chef == null)
        {
            return BadRequest("User not found.");
        }

        PasswordVerificationResult passwordVerificationResult = _passwordHasher.VerifyHashedPassword(chef.PasswordHash, credentials.Password);

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            return BadRequest("Invalid password.");
        }

        cancellationToken.ThrowIfCancellationRequested();
        await _chefRepository.RemoveAsync(credentials.Name, cancellationToken);

        return Ok();
    }
}
