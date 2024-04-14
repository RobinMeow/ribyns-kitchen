using System.ComponentModel.DataAnnotations;
using Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Application.Auth;

[ApiController]
[Route("[controller]")]
public sealed class AuthController : ControllerBase
{
    readonly IChefRepository _chefRepository;
    readonly ILogger<AuthController> _logger;
    readonly IPasswordHasher _passwordHasher;
    readonly IJwtFactory _jwtFactory;

    public AuthController(
        IChefRepository chefRepository,
        ILogger<AuthController> logger,
        IPasswordHasher passwordHasher,
        IJwtFactory jwtFactory)
        : base()
    {
        _chefRepository = chefRepository;
        _logger = logger;
        _passwordHasher = passwordHasher;
        _jwtFactory = jwtFactory;
    }

    /// <summary>sign up a new account.</summary>
    /// <param name="newChef">the data to create an account from.</param>
    /// <param name="ct"></param>
    [HttpPost(nameof(RegisterAsync))]
    public async Task<Results<Created<ChefDto>, BadRequest<string>, StatusCodeHttpResult>> RegisterAsync(
        [Required, FromBody] RegisterChefRequest newChef,
        CancellationToken ct = default)
    {
        string chefname = newChef.Name;

        ct.ThrowIfCancellationRequested();
        Chef? chefWithSameName = await _chefRepository.GetByNameAsync(chefname, ct);

        if (chefWithSameName != null)
            return TypedResults.BadRequest($"Chefname ist bereits vergeben.");

        if (newChef.Email != null)
        {
            ct.ThrowIfCancellationRequested();
            Chef? chefWithSameEmail = await _chefRepository.GetByEmailAsync(newChef.Email, ct);

            if (chefWithSameEmail != null)
                return TypedResults.BadRequest($"Email ist bereits vergeben.");
        }

        var chef = new Chef()
        {
            Id = EntityId.New(),
            Name = chefname,
            Email = newChef.Email
        };
            
        chef.SetPassword(newChef.Password, _passwordHasher);

        ct.ThrowIfCancellationRequested();
        await _chefRepository.AddAsync(chef, ct);

        return TypedResults.Created(nameof(RegisterAsync), new ChefDto
        {
            Id = chef.Id.ToString(),
            Name = chef.Name,
            Email = chef.Email,
            CreatedAt = chef.CreatedAt,
        });
    }

    /// <summary>log in using an existing account.</summary>
    /// <param name="credentials">credentials to check against and generate a JWT from.</param>
    /// <param name="ct"></param>
    /// <returns>a JWT for client side usage to keep the user logged in over a longer period of time.</returns>
    [HttpPost(nameof(LoginAsync))]
    public async Task<Results<Ok<string>, BadRequest<string>>> LoginAsync(
        [Required, FromBody] CredentialsDto credentials,
        CancellationToken ct = default)
    {
        ct.ThrowIfCancellationRequested(); // make middle where which does this. This is only for case when cancelation is requested before the request is reached
        Chef? chef = await _chefRepository.GetByNameAsync(credentials.Name, ct);

        if (chef == null)
            return UserNotFound();

        PasswordVerificationResult passwordVerificationResult = _passwordHasher.VerifyHashedPassword(chef.PasswordHash, credentials.Password);

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
            return InvalidPassword();

        string token = _jwtFactory.Create(chef);

        return TypedResults.Ok(token);
    }

    /// <summary>delete an existing account.</summary>
    /// <param name="credentials">the credentials to check against which account to delete and if the provided password matches the account.</param>
    /// <param name="ct"></param>
    [HttpPost(nameof(DeleteAsync))]
    public async Task<Results<Ok, BadRequest<string>>> DeleteAsync(
        [Required] CredentialsDto credentials,
        CancellationToken ct = default)
    {
        ct.ThrowIfCancellationRequested();
        Chef? chef = await _chefRepository.GetByNameAsync(credentials.Name, ct);

        if (chef == null)
            return UserNotFound();

        PasswordVerificationResult passwordVerificationResult = _passwordHasher.VerifyHashedPassword(chef.PasswordHash, credentials.Password);

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
            return InvalidPassword();

        ct.ThrowIfCancellationRequested();
        await _chefRepository.RemoveAsync(credentials.Name, ct);

        return TypedResults.Ok();
    }

    private BadRequest<string> UserNotFound()
    {
        return TypedResults.BadRequest("Benutzer nicht gefunden.");
    }

    private BadRequest<string> InvalidPassword()
    {
        return TypedResults.BadRequest("Falsches Passwort.");
    }
}
