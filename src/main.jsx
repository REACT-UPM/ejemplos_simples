import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UseRefUseStateVar from './UseRef/UseRefAsProp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UseRefUseStateVar />
  </StrictMode>,
)
