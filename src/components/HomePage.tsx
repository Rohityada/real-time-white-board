import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import { useKeycloak } from '@react-keycloak/web';

const HomePage: React.FC = () => {
  const [sessionId, setSessionId] = useState('');
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const createNewSession = () => {
    const newSessionId = Math.random().toString(36).substr(2, 9);
    navigate(`/whiteboard/${newSessionId}`);
  };

  const joinSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionId) {
      navigate(`/whiteboard/${sessionId}`);
    }
  };

  if (!keycloak.authenticated) {
    return (
      <Container className="mt-5">
        <h1>Welcome to Collaborative Whiteboard</h1>
        <p>Please log in to create or join a whiteboard session.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>Collaborative Whiteboard</h1>
      <Button onClick={createNewSession} className="mb-3">Create New Whiteboard</Button>
      <Form onSubmit={joinSession}>
        <Form.Group className="mb-3">
          <Form.Label>Join Existing Session:</Form.Label>
          <Form.Control
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Enter session ID"
          />
        </Form.Group>
        <Button type="submit" variant="secondary">Join Session</Button>
      </Form>
    </Container>
  );
};

export default HomePage;