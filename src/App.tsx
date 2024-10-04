import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './services/keycloak';
import HomePage from './components/HomePage';
import WhiteboardPage from './components/WhiteboardPage';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/whiteboard/:id" element={<WhiteboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  );
};

export default App;