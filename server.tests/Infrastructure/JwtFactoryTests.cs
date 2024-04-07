using Domain;
using Domain.Auth;
using api.Infrastructure.Auth;
using System.Security.Claims;

namespace api.tests.Infrastructure;

public sealed class JwtFactoryTests
{
    readonly static Chef _chef = new()
    {
        Id = EntityId.New(),
        Name = "Chefname",
    };

    [Theory]
    [InlineData("0123456789012345678901234567890123456789012345678901234567890123")] // 512 bits (64 characters * 8)
    [InlineData("0123456789012345678901234567890123456789012345678901234567890123456789")] // Larger than 512 bits
    public void creates_token_with_key_which_as_at_least_512bits(string validKey)
    {
        // Arrange
        var bearerConfig = new BearerConfig()
        {
            Audiences = ["Audience1"],
            Issuer = "Issuer",
            SigningKey = validKey
        };

        // Act
        var jwtFactory = new JwtFactory(bearerConfig, new IssuerSigningKeyFactory(bearerConfig));
        string jwt = jwtFactory.Create(_chef);

        // Assert
        NotEmpty(jwt);
    }

    [Theory]
    [InlineData("0123456789012345")] // 128 bits (16 characters * 8)
    [InlineData("012345678901234567890123456789012345678901234567890123456789012")] // 504 bits (63 characters * 8)
    public void creation_throws_with_key_which_as_less_than_512_bits(string invalidKey)
    {
        // Arrange
        var bearerConfig = new BearerConfig()
        {
            Audiences = ["Audience1"],
            Issuer = "Issuer",
            SigningKey = invalidKey
        };

        var jwtFactory = new JwtFactory(bearerConfig, new IssuerSigningKeyFactory(bearerConfig));

        // Act & Assert
        ThrowsAny<Exception>(() => jwtFactory.Create(_chef));
    }

    /// <summary>
    /// Claims are within the jwt encoded, so this test kind of belongs here. 
    /// Its just for clarification why, the test above could fail without the chef name.
    /// </summary>
    [Fact]
    public void throws_when_chefname_is_missing()
    {
        // Arrange
        var namelessChef = new Chef()
        {
            Id = EntityId.New(),
        };

        // Act & Assert
        ThrowsAny<Exception>(() => new Claim(ClaimTypes.Name, namelessChef.Name));
    }
}
