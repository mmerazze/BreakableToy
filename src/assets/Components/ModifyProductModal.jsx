import React, { useState } from 'react';
import Modal from 'react-modal';
import ComboModify from "./ComboModify.jsx";
import "./styles.css";

Modal.setAppElement('#root');

const ModifyModal = ({ isOpen, onRequestClose, product }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (newValue) => {
        setSelectedOption(newValue);
        console.log('Selected option in App:', newValue);
  };
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    let campos ={};
    campos.newString = " ";
    campos.id = product.id;
    campos.requestType = selectedOption.title;
    if(campos.requestType === 'Name'){
        campos.newString = document.getElementById("newString").value;
    }else if(campos.requestType === 'Category'){
        campos.newString = document.getElementById("newString").value;
    }else if(campos.requestType === 'Price'){
        campos.newDouble = document.getElementById("newDouble").value;
    }else if(campos.requestType === 'Stock'){
        campos.newLong = document.getElementById("newLong").value;
    }
    const response = fetch("http://localhost:8080/products/updateProduct",{
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(campos) });

    alert("Producto modificado");

    onRequestClose();
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
                                <input type="text" id="newString" className="input" onChange={handleInputChange}/>
                            </div>
                    )}

                    {selectedOption.title === 'Category' && (
                            <div>
                              <p>New category:</p>
                              <input type="text" id="newString" className="input" onChange={handleInputChange}/>
                            </div>
                    )}

                    {selectedOption.title === 'Price' && (
                            <div>
                              <p>New price:</p>
                              <input type="text" id="newDouble" className="input" onChange={handleInputChange}/>
                            </div>
                    )}

                    {selectedOption.title === 'Stock' && (
                           <div>
                               <p>New stock:</p>
                               <input type="text" id="newLong" className="input" onChange={handleInputChange}/>
                           </div>
                    )}

                    {selectedOption.title === 'Expiration Date' && (
                           <div>
                               <p>New expiration date: </p>
                               <input type="text" id="newDate" className="input" placeholder="YYYY-MM-DD" onChange={handleInputChange}/>
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