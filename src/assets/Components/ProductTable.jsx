import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function ProductTable() {
    const [rows, setRows] = useState([]); // State to hold the fetched product data
    const [loading, setLoading] = useState(true);
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 90 },
        { field: 'category', headerName: 'Category', width: 120 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'stock', headerName: 'Stock', width: 90 },
        { field: 'expirationDate', headerName: 'Expiration Date', width: 160 },
        {
              field: 'actions',
              headerName: 'Actions',
              width: 200,
              renderCell: (params) => (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleModify(params.row)}
                    style={{ marginRight: '5px' }}
                  >
                    Modify
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
      ];
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products/getProducts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const formattedData = data.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
          expirationDate: product.expirationDate
        }));
        setRows(formattedData); // Set the fetched data to rows
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    useEffect(() => {
        fetchProducts();
      }, []);

    const handleModify = (row) => {
      console.log('Modify:', row);
      // Implement your modify logic here
    };

    // Handle delete action
    const handleDelete = (id) => {
      console.log('Delete ID:', id);
      // Implement your delete logic here
      // For example, you could filter out the deleted row from the state
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading} // Show loading state while fetching
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
