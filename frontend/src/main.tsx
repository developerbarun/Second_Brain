import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "10px",
          background: "#1e1e1e",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
        },
      }}
    />
  </StrictMode>,
)
