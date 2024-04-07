using System.ComponentModel.DataAnnotations;

namespace Application;

public abstract record EntityDto
{
    [Required]
    public string Id { get; set; } = null!;

    [Required]
    public DateTime CreatedAt { get; set; }
}
