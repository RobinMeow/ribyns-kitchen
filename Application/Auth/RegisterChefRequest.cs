using System.ComponentModel.DataAnnotations;
using Common;
using Domain;

namespace Application.Auth;

public sealed record class RegisterChefRequest
{
    [Required]
    [StringRange(ChefValidatiors.NameMinLength, ChefValidatiors.NameMaxLength)]
    public string Name { get; set; } = null!;

    [Required]
    [StringRange(ChefValidatiors.PasswordMinLength, ChefValidatiors.PasswordMaxLength)]
    public string Password { get; set; } = null!;

    [EmailAddress]
    [StringRange(ChefValidatiors.EmailMinLength, ChefValidatiors.EmailMaxLength)]
    public string? Email { get; set; } = null;
}
