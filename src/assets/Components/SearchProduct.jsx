import * as React from 'react';
import "./styles.css"
import Box from '@mui/material/Box';
import ComboCategories from "./ComboCategories.jsx";
import ComboAvailability from "./ComboAvailability.jsx";

export default function  SearchProduct(){
    return(
        <Box
         display="grid"
         justifyContent="center"
         alignItems="center"
        sx={{
            p: 2,
            border: '2px solid black',
            width: '900px'
        }}
        >
              <label >Name:
              <input type="text"
                     placeholder="Enter name"
                     className = "input"
              />
            </label>
            <br/>
            <label>Category: <ComboCategories /> </label>
            <br/>
            <label>Availability: <ComboAvailability /> </label>
            <br/>
            <button className="searchButton" > Search </button>
         </Box>
    )
}
