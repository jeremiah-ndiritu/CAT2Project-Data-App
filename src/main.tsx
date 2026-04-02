import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './ctx/providers/ModalProvider.tsx';
import { SessionProvider } from './ctx/providers/SessionProvider.tsx';
import { ThemeProvider } from './ctx/providers/ThemeProvider.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SessionProvider>
        <ModalProvider>
          <App />
          <Toaster position='top-right' />
        </ModalProvider>
      </SessionProvider>
    </ThemeProvider>
  </StrictMode>,
);
