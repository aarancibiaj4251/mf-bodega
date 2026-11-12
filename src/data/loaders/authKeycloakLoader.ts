import keycloak from '../../config/auth/keycloak.config';

export const initKeyCloakLoader = async () => {
  const loader = document.getElementById('loader');
  if (keycloak.didInitialize && keycloak.authenticated) {
    validateLoader(loader);
    return Promise.resolve(true);
  }
  return new Promise(async (resolve, reject) => {
    if (!keycloak.didInitialize) {
      try {
        const authenticated = await keycloak.init({
          pkceMethod: 'S256',
          redirectUri: window.location.origin + window.location.pathname,
          onLoad: 'check-sso',
        });
        if (!authenticated) {
          resolve(false);
        }
      } catch (e) {
        resolve(false);
      } finally {
        validateLoader(loader);
      }
    }
    keycloak.onReady = async (authenticated: boolean) => {
      if (keycloak.authenticated) {
        await keycloak.loadUserProfile();
      }
      validateLoader(loader);
      resolve(authenticated);
    }
  })
}

const validateLoader = (loader: HTMLElement) => {
  if (loader) {
    loader.style.display = 'none';
  }
}
