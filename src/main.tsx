import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* para pasar el codigo a typescript hay que agreganle un ! 
que anule la posibilidad de que sea null 
|---> aunque no es una buena practica */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
