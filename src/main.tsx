import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from 'sonner';


import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
   <BrowserRouter>
      <Suspense>
        <App />
        <Toaster   position="top-right"/>
      </Suspense>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)