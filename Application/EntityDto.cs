using System.ComponentModel.DataAnnotations;

namespace Application;

public abstract class EntityDto
{
    [Required]
    public required string Id { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }
}
