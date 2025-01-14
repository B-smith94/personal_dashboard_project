import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MyApolloProvider from './Providers/ApolloProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MyApolloProvider>
        <App />
      </MyApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
