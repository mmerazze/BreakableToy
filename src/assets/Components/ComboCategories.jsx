import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ComboCategories = ({ value, onChange}) => {
    const [rows, setRows] = useState([]);
    const fetchCategories = async () => {
          try {
            const response = await fetch('http://localhost:8080/products/getCategories');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRows(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          } finally {
            setLoading(false);
          }
        };
        useEffect(() => {
            fetchCategories();
          }, []);
  return (
    <FormControl variant="outlined" sx={{ width: '200px' }}>
      <InputLabel id="category-label">Search by Category</InputLabel>
      <Select
         labelId="category-label"
         name="category"
         value={value}
         onChange={onChange}
         label="Search by Category"
         >
         {rows.map((category) => (
             <MenuItem key={category} value={category}>
                            {category}
             </MenuItem>
         ))}
      </Select>
    </FormControl>
  );
}
export default ComboCategories;