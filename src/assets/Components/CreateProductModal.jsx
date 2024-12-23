import React, { useState } from 'react';
import Modal from 'react-modal';
import "./styles.css";

Modal.setAppElement('#root'); // Set the app element for accessibility

const ProductModal = ({ isOpen, onRequestClose }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle product creation logic here
    let campos ={};
    campos.name = document.getElementById("name").value;
    campos.category = document.getElementById("category").value;
    campos.price = document.getElementById("price").value;
    campos.stock = document.getElementById("stock").value;
    campos.expirationDate = document.getElementById("expirationDate").value
    const peticion = fetch("http://localhost:8080/products/addProduct",{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(campos)
        });
    alert("Producto creado");

    onRequestClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="p">Name:
            <input type="text"
                 id = "name"
                 placeholder="Enter name"
                 className = "input"
            />
          </p>
          <p className="p">Category:
            <input type="text"
                 id = "category"
                 placeholder="Enter category"
                 className = "input"
            />
          </p>
          <p className="p">Price:
            <input type="text"
                  id = "price"
                  placeholder="Enter price"
                  className = "input"
            />
          </p>
          <p className="p">Stock:
              <input type="text"
                     id = "stock"
                     placeholder="Enter stock"
                     className = "input"
              />
          </p>
          <p className="p">Expiration date:
                        <input type="text"
                               id = "expirationDate"
                               placeholder="Enter date (YYYY-MM-DD)"
                               className = "input"
                        />
                    </p>
        </div>
        <button type="submit">Create Product</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ProductModal;