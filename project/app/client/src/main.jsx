import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.jsx';
import store from './store/store.jsx';
import './index.css';

// Create a client
const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
