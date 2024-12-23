import * as React from 'react';
import "./styles.css"
import Box from '@mui/material/Box';


export default function  SearchProduct(){
    const registrarPelicula = () => {
            let campos ={};
            campos.name = document.getElementById("name").value;
            campos.category = document.getElementById("category").value;
            campos.price = document.getElementById("price").value;
            campos.stock = document.getElementById("stock").value;
            const peticion = fetch("http://localhost:8080/products/addProduct",{
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(campos)
                });
            alert("Producto creado");
            }
    return(
        <Box
        sx={{
            p: 2,
            border: '2px solid black', // Set the border to be 2px solid black
            width: '900px' // Set the width to 700 pixels
        }}
        >
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
           <button id="botonCrear" className="searchButton" onClick={registrarPelicula}> Crear Producto </button>
         </Box>
    )
}
