import { KeycloakService } from 'keycloak-angular';


export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: 'https://dev-keycloak.livecontract.de/auth/',
                realm: 'v-terminal',
                clientId: 'vterminal-admin-app'
            },
            initOptions: {
                //   onLoad: 'login-required',
                checkLoginIframe: true
            }
        });
}
