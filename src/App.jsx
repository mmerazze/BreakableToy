import { useState } from 'react'
import * as React from 'react';
import './App.css'
import CreateProduct from "./assets/Components/CreateProduct.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className ="title"> Products Manager</h1>
      <div>
        <CreateProduct />
      </div>

    </>
  )
}


export default App
