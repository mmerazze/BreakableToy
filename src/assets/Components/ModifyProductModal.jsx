import React, { useState } from 'react';
import Modal from 'react-modal';
import ComboModify from "./ComboModify.jsx";
import "./styles.css";

Modal.setAppElement('#root'); // Set the app element for accessibility

const ModifyModal = ({ isOpen, onRequestClose, id }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (newValue) => {
        setSelectedOption(newValue);
        console.log('Selected option in App:', newValue); // Access the selected option here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle product creation logic here
    let campos ={};


    const peticion = fetch("http://localhost:8080/products/addProduct",{
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(campos)
        });

    alert("Producto modificado");

    onRequestClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Modify Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <ComboModify selectedOption={selectedOption} onOptionChange={handleOptionChange}/>
          {selectedOption && (
                  <div>
                    <h3>Selected Option in App:</h3>
                    <p>{selectedOption.title}</p>
                  </div>
                )}
        </div>
        <div>
            <p className="p">New value:
               <input type="text"
                       id = "newValue"
                       placeholder="Enter new value"
                       className = "input"
               />
            </p>
        </div>
        <button type="submit">Modify Product</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ModifyModal;