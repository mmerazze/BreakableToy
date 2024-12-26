import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const availability = ['In stock', 'Out of stock', 'All'];

const ComboAvailability = ({ value, onChange }) => {
  return (
          <FormControl variant="outlined" sx={{ width: '200px' }}>
              <InputLabel id="stock-label">Search by Stock</InputLabel>
              <Select
                  labelId="stock-label"
                  name="stock"
                  value={value}
                  onChange={onChange}
                  label="Search by Stock"
              >
                  {availability.map((option) => (
                      <MenuItem key={option} value={option}>
                          {option}
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>
      );
}
export default ComboAvailability;