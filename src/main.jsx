import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FetchIA from './FetchIA'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchIA />
  </StrictMode>,
)
