namespace api.Domain;

public sealed class Chef : Entity
{
    public Chef() : base() {}

    public string Name { get; set; } = null!;

    public string? Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public void SetPassword(string password, IPasswordHasher passwordHasher)
    {
        PasswordHash = passwordHasher.Hash(password);
    }
}
