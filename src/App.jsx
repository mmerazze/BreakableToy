import React, { useState } from 'react';
import {useEffect} from 'react';
import './App.css';
import SearchProduct from "./assets/Components/SearchProduct.jsx";
import ProductTable from "./assets/Components/ProductTable.jsx";
import ProductModal from "./assets/Components/CreateProductModal.jsx";
import Metrics from "./assets/Components/Metrics.jsx";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

      const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

  return (
    <>
    <h1 className ="title"> Products Manager</h1>
      <div>
        <button onClick={openModal}>Create New Product</button>
        <ProductModal isOpen={isModalOpen} onRequestClose={closeModal} />
        <br/>
        <br/>
        <ProductTable />
        <br/>
        <br/>
        <Metrics />
      </div>
    </>
  )
}

export default App
