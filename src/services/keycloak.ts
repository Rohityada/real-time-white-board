import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'whiteboard-realm',
  clientId: 'whiteboard-client'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;