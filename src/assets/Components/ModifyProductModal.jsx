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
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle product creation logic here
    let campos ={};
    campos.id = document.getElementById("id").value;
    campos.requestType = selectedOption.title;
    campos.newString = document.getElementById("newString").value;
    campos.newDouble = document.getElementById("newDouble").value;
    campos.newLong = document.getElementById("newLong").value;
    alert(selectedOption.title);
    const response = fetch("http://localhost:8080/products/updateProduct",{
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(campos) });

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
                    <h3>Modify: </h3>
                    <p>{selectedOption.title}</p>
                    {selectedOption.title === 'Name' && (
                            <div>
                              <p>New name: </p>
                              <input type="text" id="newString" className="input" />
                            </div>
                    )}

                    {selectedOption.title === 'Category' && (
                            <div>
                              <p>New category:</p>
                              <input type="text" id="newString" className="input" />
                            </div>
                    )}

                    {selectedOption.title === 'Price' && (
                            <div>
                              <label>New price:</label>
                              <input type="text" id="newDouble" className="input"/>
                            </div>
                    )}

                    {selectedOption.title === 'Stock' && (
                           <div>
                               <label>New stock:</label>
                               <input type="text" id="newLong" className="input" />
                           </div>
                    )}

                    {selectedOption.title === 'Expiration Date' && (
                           <div>
                                <label>New expiration date: </label>
                                <input type="text" id="newDate" className="input" placeholder="YYYY-MM-DD"/>
                           </div>
                    )}
                  </div>
                )}
        </div>

        <button type="submit">Modify Product</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ModifyModal;