using System.ComponentModel.DataAnnotations;

namespace Application;

public sealed record ChefDto : EntityDto
{
    [Required]
    public string Name { get; set; } = null!;

    [EmailAddress]
    public string? Email { get; set; }
}
