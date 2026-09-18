import './styles/globals.scss'

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// https://mickiewicza21.pl/oferta/mieszkanie-l29/
// https://develia.pl/pl/mieszkania/gdansk/poludnie-vita/pt-b6-01-17/
// Zgodnie z konwencją positioning → layout → sizing → spacing → typography → visuals → effects/transitions,
