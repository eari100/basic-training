import React from "react";
import keycloakService from "./api/keycloak/keycloakService";

type HeaderNavProps = {
    keycloakServiceInstance: keycloakService;
}
export const HeaderNav = ({keycloakServiceInstance}: HeaderNavProps) => {
    return (
        <button onClick={() => keycloakServiceInstance.logout()}>logout</button>
    )
}