using Domain;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure;

public sealed class AspPasswordHasher : IPasswordHasher
{
    static readonly PasswordHasher<object> s_passwordHasher = new();

    // https://github.com/dotnet/aspnetcore/blob/main/src/Identity/Extensions.Core/src/PasswordHasher.cs
    // :table_flip:
    static readonly object s_user = null!;

    public string Hash(string password) => s_passwordHasher.HashPassword(s_user, password);

    public PasswordVerificationResult VerifyHashedPassword(string hashedPassword, string providedPassword)
        => s_passwordHasher.VerifyHashedPassword(s_user, hashedPassword, providedPassword);
}
