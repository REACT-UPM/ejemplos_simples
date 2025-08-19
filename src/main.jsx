import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChildrenDemo from './props_state4/ChildrenDemo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChildrenDemo />
  </StrictMode>,
)
