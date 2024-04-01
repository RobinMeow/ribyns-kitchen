using System.ComponentModel.DataAnnotations;
using api.Domain;

namespace api.Controllers;

public abstract class EntityDto
{
    [Required]
    public string Id { get; set; } = EntityId.New();

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.MinValue;
}
