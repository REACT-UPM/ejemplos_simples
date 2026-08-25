import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Suspense from './suspense/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense />
  </StrictMode>,
)
