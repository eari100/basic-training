import keycloak, {KeycloakConfig} from "keycloak-js"

export default class keycloakService {
    private static instance: keycloakService;
    private keycloak: keycloak | undefined

    constructor(config: KeycloakConfig) {
        if(keycloakService.instance)
            return keycloakService.instance

        this.keycloak = new keycloak(config)
        keycloakService.instance = this
    }

    init(renderCallback: () => void) {
        this.keycloak!.init({onLoad: 'login-required'})
            .then((authenticated) => this.handleAuthenticated(renderCallback, authenticated))
            .catch(err => console.log(err))
    }

    handleAuthenticated(renderCallback: () => void, authenticated: boolean) {
        if(!authenticated) throw Error('인증되지 않은 접근입니다.')
        if(!this.keycloak?.hasRealmRole('default-roles-myrealm')) throw Error('접근 권한이 없습니다.')
        renderCallback()
    }

    login() {
        this.keycloak?.login()
    }

    async logout() {
        await this.keycloak?.logout()
    }
}