namespace api.Domain;

public sealed class Chef() : Entity()
{

    public const int MODEL_VERSION = 0;

    public override int ModelVersion { get; init; } = MODEL_VERSION;

    public string Name { get; set; } = null!;

    public string? Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public void SetPassword(string password, IPasswordHasher passwordHasher)
    {
        PasswordHash = passwordHasher.Hash(password);
    }
}
