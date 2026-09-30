import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import User from './props_state/User.jsx'


createRoot(document.getElementById('root')).render(
    <User hoy="miercoles" />
)
