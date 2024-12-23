import * as React from 'react';
import {useEffect} from 'react';
import './App.css';
import SearchProduct from "./assets/Components/SearchProduct.jsx";
import CreateProduct from "./assets/Components/CreateProduct.jsx";
import ProductTable from "./assets/Components/ProductTable.jsx";

function App() {
  return (
    <>
    <h1 className ="title"> Products Manager</h1>
      <div>
        <SearchProduct />
        <br/>
        <CreateProduct />
        <br/>
        <ProductTable />
      </div>
    </>
  )
}

export default App
