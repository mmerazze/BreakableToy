import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const categories = ['Food', 'Clothing', 'Electronics'];

export default function ComboCategories() {
  return (
    <Autocomplete
      disablePortal
      options={categories}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}
