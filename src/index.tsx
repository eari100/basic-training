import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Todo} from "./Todo";
import keycloakService from "./api/keycloak/keycloakService";
import {KeycloakConfig} from "keycloak-js";
import {HeaderNav} from "./headerNav";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8090',
    realm: 'myRealm',
    clientId: 'myClient'
}
const keycloakServiceInstance = new keycloakService(keycloakConfig)

const render = () => root.render(
    <React.StrictMode>
        <HeaderNav keycloakServiceInstance={keycloakServiceInstance} />
        <Todo />
    </React.StrictMode>
);


keycloakServiceInstance.init(render)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
