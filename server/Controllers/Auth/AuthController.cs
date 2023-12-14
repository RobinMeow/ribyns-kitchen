using System.ComponentModel.DataAnnotations;
using api.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Domain;

namespace api.Controllers.Auth;

[ApiController]
[Route("[controller]")]
public sealed class AuthController(
    DbContext _context,
    ILogger<AuthController> _logger,
    IPasswordHasher _passwordHasher,
    IJwtFactory _jwtFactory
    ) : CcController
{
    readonly IChefRepository _chefRepository = _context.ChefRepository;
    readonly ILogger<AuthController> _logger = _logger;
    readonly IPasswordHasher _passwordHasher = _passwordHasher;
    readonly IJwtFactory _jwtFactory = _jwtFactory;

    /// <summary>sign up a new account.</summary>
    /// <param name="newChef">the data to create an account from.</param>
    /// <param name="cancellationToken"></param>
    [HttpPost(nameof(RegisterAsync))]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesDefaultResponseType]
    public async Task<IActionResult> RegisterAsync([Required] RegisterChefDto newChef, CancellationToken cancellationToken = default)
    {
        string chefname = newChef.Name;

        try
        {
            Chef? chefWithSameName = await _chefRepository.GetByNameAsync(chefname, cancellationToken);

            if (chefWithSameName != null)
                return BadRequest($"Chefname ist bereits vergeben.");

            if (newChef.Email != null)
            {
                cancellationToken.ThrowIfCancellationRequested();
                Chef? chefWithSameEmail = await _chefRepository.GetByEmailAsync(newChef.Email, cancellationToken);

                if (chefWithSameEmail != null)
                    return BadRequest($"Email ist bereits vergeben.");
            }

            var chef = new Chef()
            {
                Name = chefname,
                Email = newChef.Email
            };

            cancellationToken.ThrowIfCancellationRequested();

            chef.SetPassword(newChef.Password, _passwordHasher);

            await _chefRepository.AddAsync(chef, cancellationToken);

            return Created();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, CreateErrorMessage(nameof(AuthController), nameof(RegisterAsync)), newChef);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
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
        try
        {
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

            string token = _jwtFactory.Create(chef);

            return Ok(token);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, CreateErrorMessage(nameof(AuthController), nameof(LoginAsync)), credentials);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
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
        try
        {
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

            await _chefRepository.RemoveAsync(credentials.Name, cancellationToken);

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, CreateErrorMessage(nameof(AuthController), nameof(DeleteAsync)), credentials);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
