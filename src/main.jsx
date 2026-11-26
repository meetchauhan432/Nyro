import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.jsx';
import { AuthGate } from './features/auth/components/AuthGate.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const logo = `${import.meta.env.BASE_URL}nyro-logo.png`;

createRoot(document.getElementById('root')).render(
  <AuthGate logo={logo}>
    {({ signOut, isEntering, justSignedIn }) => (
      <App logo={logo} onSignOut={signOut} isEntering={isEntering} justSignedIn={justSignedIn} />
    )}
  </AuthGate>,
);
