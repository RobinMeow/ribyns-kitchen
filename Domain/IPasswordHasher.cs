using Microsoft.AspNetCore.Identity;

namespace Domain;

public interface IPasswordHasher
{
    string Hash(string password);
    PasswordVerificationResult VerifyHashedPassword(string hashedPassword, string providedPassword);
}

