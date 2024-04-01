// https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/technical-reference/the-role-of-claims

export enum TokenKey {
  Issuer = 'iss',
  Audience = 'aud',
  ExpirationDateInMsSinceEpoche = 'exp',
  Name = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name' // Uniform Resource Identifier
}
