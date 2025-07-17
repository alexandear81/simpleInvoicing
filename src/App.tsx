import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import InvoiceForm from "./components/InvoiceForm";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100">
      <InvoiceForm />
    </div>
  );
}

export default App
