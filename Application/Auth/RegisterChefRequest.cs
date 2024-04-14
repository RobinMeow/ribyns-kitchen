using System.ComponentModel.DataAnnotations;
using Common;
using Domain;

namespace Application.Auth;

public sealed record class RegisterChefRequest
{
    [Required]
    [StringRange(ChefValidations.NameMinLength, ChefValidations.NameMaxLength)]
    public string Name { get; set; } = null!;

    [Required]
    [StringRange(ChefValidations.PasswordMinLength, ChefValidations.PasswordMaxLength)]
    public string Password { get; set; } = null!;

    [EmailAddress]
    [StringRange(ChefValidations.EmailMinLength, ChefValidations.EmailMaxLength)]
    public string? Email { get; set; } = null;
}
