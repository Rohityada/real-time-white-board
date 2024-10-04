import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Container, Button } from 'react-bootstrap';

const LoginPage: React.FC = () => {
  const { keycloak } = useKeycloak();

  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to Collaborative Whiteboard</h1>
      <Button onClick={() => keycloak.login()}>Login with Keycloak</Button>
    </Container>
  );
};

export default LoginPage;