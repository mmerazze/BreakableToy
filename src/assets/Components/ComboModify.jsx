import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [
  { title: 'Name' },
  { title: 'Category' },
  { title: 'Price' },
  { title: 'Stock'},
  { title: 'Expiration Date'}
];
export default function ComboModify({ selectedOption, onOptionChange}) {
    const handleChange = (event, newValue) => {
        onOptionChange(newValue);
      };

  return (
    <div>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.title}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Modify" />}
          />
        </div>
  );
}