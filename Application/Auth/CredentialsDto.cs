using System.ComponentModel.DataAnnotations;

namespace Application.Auth;

public sealed record class CredentialsDto
{
    [Required]
    // TODO [NotNullOrWhiteSpace]
    public string Name { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}
