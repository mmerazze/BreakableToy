import * as React from 'react';
import Box from '@mui/material/Box';
import ComboCategories from "./ComboCategories.jsx";
import ComboAvailability from "./ComboAvailability.jsx";

export default function  CreateProduct(){
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
                     placeholder="Enter name"
                     className = "input"
              />
            </p>
            <ComboCategories />
            <br/>
            <ComboAvailability />
         </Box>
    )
}
