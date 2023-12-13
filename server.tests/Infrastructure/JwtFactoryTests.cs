using api.Domain;
using api.Domain.Auth;
using api.Infrastructure.Auth;

namespace server.tests.Infrastructure;

public sealed class JwtFactoryTests
{
    [Theory]
    [InlineData("0123456789012345678901234567890123456789012345678901234567890123")] // 512 bits (64 characters * 8)
    [InlineData("0123456789012345678901234567890123456789012345678901234567890123456789")] // Larger than 512 bits
    public void creates_token_with_key_which_as_at_least_512bits(string validKey)
    {
        // Arrange
        var chef = new Chef("Chefname", EntityId.New());
        var bearerConfig = new BearerConfig()
        {
            Audiences = ["Audience1"],
            Issuer = "Issuer",
            SigningKey = validKey
        };

        // Act
        var jwtFactory = new JwtFactory(bearerConfig, new IssuerSigningKeyFactory(bearerConfig));
        string jwt = jwtFactory.Create(chef);

        // Assert
        NotEmpty(jwt);
    }

    [Theory]
    [InlineData("0123456789012345")] // 128 bits (16 characters * 8)
    [InlineData("012345678901234567890123456789012345678901234567890123456789012")] // 504 bits (63 characters * 8)
    public void creation_throws_with_key_which_as_less_than_512_bits(string invalidKey)
    {
        // Arrange
        var chef = new Chef("Chefname", EntityId.New());
        var bearerConfig = new BearerConfig()
        {
            Audiences = ["Audience1"],
            Issuer = "Issuer",
            SigningKey = invalidKey
        };

        var jwtFactory = new JwtFactory(bearerConfig, new IssuerSigningKeyFactory(bearerConfig));

        // Act & Assert
        ThrowsAny<Exception>(() => jwtFactory.Create(chef));
    }
}
