using System.ComponentModel.DataAnnotations;
using api.Domain;

namespace api.Controllers;

public abstract class EntityDto
{
    [Required]
    public string Id { get; set; } = EntityId.New();

    /// <summary>
    /// make sure to add the <see cref="RequiredAttribute"/> on overriding.
    /// (So it generates a cleaner front end model)
    /// </summary>
    public abstract int ModelVersion { get; init; }

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.MinValue;
}
