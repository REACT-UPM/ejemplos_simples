import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CargaDatosUseSinCache from './cargaDatos/CargaDatosUseSinCache'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CargaDatosUseSinCache url="https://dummyjson.com/users/1" />
  </StrictMode>,
)
