import React from 'react'
import ReactDOM from 'react-dom/client'
import { expo } from '../../app.json'
import App from './App'
import './index.css'

// set the title of the page
document.title = expo.name

// TODO: fix public path
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
