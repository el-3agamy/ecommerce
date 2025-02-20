import { StrictMode } from 'react' ;
import { createRoot } from 'react-dom/client' ;
import {HeroUIProvider} from '@heroui/react';
import App from './App.jsx'; 
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <HeroUIProvider>
         <App />
      </HeroUIProvider>
  </StrictMode>,
)
