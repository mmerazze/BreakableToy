import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [
  { title: 'Name' },
  { title: 'Category' },
  { title: 'Price' },
  { title: 'Stock'}
];
export default function ComboModify({ selectedOption, onOptionChange }) {
    const handleChange = (event, newValue) => {
        onOptionChange(newValue); // Call the callback to update the selected option in the parent
      };

  return (
    <div>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.title} // Customize this based on your data structure
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Modify" />}
          />
        </div>
  );
}