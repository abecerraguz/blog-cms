import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TemaProvider } from '@/context/TemaContext'
import { AuthProvider } from "@/context/AuthContext"

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TemaProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TemaProvider>
  </StrictMode>
)