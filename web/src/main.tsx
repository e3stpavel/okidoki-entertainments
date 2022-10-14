import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// for accessing global src we can use `~`
import { expo } from '~/../app.json'

// for accessing local scope (web) we can use `@`
import '@/index.css'

// to access assets only in web!! we can use `/some-asset.png`

// set the title of the page
document.title = expo.name

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
