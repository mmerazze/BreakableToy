import React, { useEffect, useState } from 'react';
import "./styles.css"
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import ComboCategories from "./ComboCategories.jsx";
import ComboAvailability from "./ComboAvailability.jsx";

const SearchProduct = ({ searchName, searchCategory, searchStock, onSearchChange, onReturn }) => {
       return (
           <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
           <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
               <TextField
                  label="Search by Name"
                  variant="outlined"
                  name="name"
                  value={searchName}
                  onChange={onSearchChange}
               />
               <ComboCategories
                   value={searchCategory}
                   onChange={onSearchChange}
               />
               <ComboAvailability
                   value={searchStock}
                   onChange={onSearchChange}
               />
               <button onClick={onReturn}>RETURN</button>
           </div>
           </Box>
       );
};

export default SearchProduct;
