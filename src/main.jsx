import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './cors/App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
