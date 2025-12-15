import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <div className='bg-red-100 p-10 w-full h-full min-h-screen'>
    <App />
  </div>,
)
