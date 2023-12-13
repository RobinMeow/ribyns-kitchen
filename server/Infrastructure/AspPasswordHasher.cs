using api.Domain;
using Microsoft.AspNetCore.Identity;

namespace api.Infrastructure;

public sealed class AspPasswordHasher : IPasswordHasher
{
    static readonly PasswordHasher<Chef> s_passwordHasher = new();

    public string Hash(Chef chef, string password) => s_passwordHasher.HashPassword(chef, password);

    public PasswordVerificationResult VerifyHashedPassword(Chef chef, string hashedPassword, string providedPassword) => s_passwordHasher.VerifyHashedPassword(chef, hashedPassword, providedPassword);
}
