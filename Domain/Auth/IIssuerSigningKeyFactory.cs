using Microsoft.IdentityModel.Tokens;

namespace Domain.Auth;

public interface IIssuerSigningKeyFactory
{
    public SecurityKey Create();
}