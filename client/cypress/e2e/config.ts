const apiBaseUrl = 'http://localhost:5126'
const authUrl = apiBaseUrl + '/Auth'

/** @__PURE__ */
export const config = {
  apiUrls: {
    auth: {
      registerAsync: authUrl + '/RegisterAsync',
      loginAsync: authUrl + '/LoginAsync',
      deleteAsync: authUrl + '/DeleteAsync'
    }
  }
}
