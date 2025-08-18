import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Car from './Car'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Car />
  </StrictMode>,
)
