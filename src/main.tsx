import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './styles/index.css';

const APP_VERSION = '4.0.0';

// Nuclear Cache Clearing & Version Check
const currentVersion = localStorage.getItem('app_version');

if (currentVersion !== APP_VERSION) {
  console.log('New version detected. Performing nuclear cleanup...');

  // 1. Clear Local Storage (except essential data if needed, but for now clear all to be safe)
  // localStorage.clear(); // User asked for data persistence, so maybe don't clear ALL.
  // actually, let's just clear cache-related things.

  // 2. Unregister Service Workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  // 3. Clear Cache Storage
  if ('caches' in window) {
    caches.keys().then(names => {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }

  // 4. Update Version
  localStorage.setItem('app_version', APP_VERSION);

  // 5. Force Reload (if we haven't just reloaded)
  if (!sessionStorage.getItem('reloaded')) {
    sessionStorage.setItem('reloaded', 'true');
    window.location.reload();
  } else {
    sessionStorage.removeItem('reloaded');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
