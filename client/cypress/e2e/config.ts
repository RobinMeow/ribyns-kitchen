const apiBaseUrl = 'http://localhost:5126';
const authUrl = apiBaseUrl + '/Auth';

export const config = {
  apiUrls: {
    auth: {
      registerAsync: authUrl + '/RegisterAsync',
      loginAsync: authUrl + '/LoginAsync',
      deleteAsync: authUrl + '/DeleteAsync',
    },
  },
};
