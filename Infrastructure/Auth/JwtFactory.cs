using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Domain;
using Domain.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Auth;

public sealed class JwtFactory : IJwtFactory
{
    readonly BearerConfig _bearerConfig;

    readonly IIssuerSigningKeyFactory _issuerSigningKeyFactory;

    public JwtFactory(IConfiguration configuration, IIssuerSigningKeyFactory issuerSigningKeyFactory)
        : this(configuration.GetSection(nameof(BearerConfig)).Get<BearerConfig>()
            ?? throw new ArgumentException($"Missing dependency injection for {nameof(IConfiguration)}."), issuerSigningKeyFactory)
    {
    }

    public JwtFactory(BearerConfig bearerConfig, IIssuerSigningKeyFactory issuerSigningKeyFactory)
    {
        _bearerConfig = bearerConfig;
        _issuerSigningKeyFactory = issuerSigningKeyFactory;
    }

    public string Create(Chef chef)
    {
        var claims = new List<Claim>() {
            new (ClaimTypes.Name, chef.Name),
        };

        SecurityKey securityKey = _issuerSigningKeyFactory.Create();

        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: signingCredentials,
            issuer: _bearerConfig.Issuer,
            audience: string.Join(",", _bearerConfig.Audiences) // https://www.ibm.com/docs/en/datapower-gateway/2018.4?topic=commands-aud-claim "a comma-separated string of values"
            );

        string jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
}
