import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryProvider } from './lib/react-query'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <BrowserRouter basename="/match-test-service">
        <App />
      </BrowserRouter>
    </ReactQueryProvider>
  </React.StrictMode>
)
