import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const categories = ['Food', 'Clothing', 'Electronics'];

export default function ComboCategories() {
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
    <Autocomplete
      disablePortal
      options={rows}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}
