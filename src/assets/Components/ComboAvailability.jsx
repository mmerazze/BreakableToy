import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const availability = ['In stock', 'Out of stock', 'All'];

export default function ComboAvailability() {
  return (
    <Autocomplete
      disablePortal
      options={availability}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Availability" />}
    />
  );
}