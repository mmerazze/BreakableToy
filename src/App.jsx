import { useState } from 'react'
import * as React from 'react';
import './App.css'
import SearchProduct from "./assets/Components/SearchProduct.jsx"

function App() {
  const [name, setName] = useState("")

  return (
    <>
    <h1 className ="title"> Products Manager</h1>
      <div>
        <SearchProduct />
      </div>

    </>
  )
}


export default App
