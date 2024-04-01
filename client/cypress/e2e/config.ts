const apiBaseUrl = 'http://localhost:5126'
const authUrl = apiBaseUrl + '/Auth'

export const config = {
  hostUrl: 'http://localhost:4200',
  apiUrls: {
    base: apiBaseUrl,
    auth: {
      registerAsync: authUrl + '/RegisterAsync',
      loginAsync: authUrl + '/LoginAsync',
      deleteAsync: authUrl + '/DeleteAsync'
    }
  }
}
