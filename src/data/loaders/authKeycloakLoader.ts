import keycloak from '../../config/auth/keycloak.config';

export const initKeyCloakLoader = async () => {
  if (keycloak.didInitialize && keycloak.authenticated) {
    return Promise.resolve(true);
  }
  return new Promise(async (resolve, reject) => {
    if (!keycloak.didInitialize) {
      try {
        await keycloak.init({
          pkceMethod: 'S256',
          redirectUri: window.location.origin + window.location.pathname,
          onLoad: 'check-sso',
        });
      } catch (e) {
        resolve(false);
      }
    }
    keycloak.onReady = async (authenticated: boolean) => {
      if (keycloak.authenticated) {
        await keycloak.loadUserProfile();
      }
      resolve(authenticated);
    }
  })
}
