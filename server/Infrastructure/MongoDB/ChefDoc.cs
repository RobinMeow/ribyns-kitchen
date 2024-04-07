using Domain;

namespace api.Infrastructure.MongoDB;

public sealed record ChefDoc : Document
{
    const ushort MODEL_VERSION = 0;

    public override ushort ModelVersion { get; set; } = MODEL_VERSION;

    public required string Name { get; set; }

    public required string PasswordHash { get; set; }

    public string? Email { get; set; }

    internal static ChefDoc Create(Chef chef)
    {
        return new ChefDoc()
        {
            Id = chef.Id.ToString(),
            Name = chef.Name,
            PasswordHash = chef.PasswordHash,
            Email = chef.Email,
            CreatedAt = chef.CreatedAt,
        };
    }
}
