import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import store, { persistor } from './redux/store';
import App from './App';
import { SettingsProvider } from './contexts/SettingsContext';
import Scrollbar from './components/Scrollbar';
import { AuthProvider } from './contexts/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <SnackbarProvider maxSnack={3}>
                    <Scrollbar sx={{ height: 1 }}>
                      <App />
                    </Scrollbar>
                  </SnackbarProvider>
                </PersistGate>
              </Provider>
            </BrowserRouter>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
);
