import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import ModifyModal from "./ModifyProductModal.jsx";
import ComboModify from "./ComboModify.jsx";
import SearchProduct from './SearchProduct.jsx';

export default function ProductTable() {
        const [rows, setRows] = useState([]);
        const [loading, setLoading] = useState(true);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedProduct, setSelectedProduct] = useState(null);
        const [searchName, setSearchName] = useState('');
        const [searchCategory, setSearchCategory] = useState('');
        const [searchStock, setSearchStock] = useState('');

        const handleSearchChange = (event) => {
                const { name, value } = event.target;
                if (name === 'name') {
                    setSearchName(value);
                } else if (name === 'category') {
                    setSearchCategory(value);
                } else if (name === 'stock') {
                    setSearchStock(value);
                }
        };

        const filteredProducts = rows.filter((row) => {
              const matchesName = row.name.toLowerCase().includes(searchName.toLowerCase());
              const matchesCategory = row.category.toLowerCase().includes(searchCategory.toLowerCase());
              let matchesStock = false;
              if (searchStock === 'In stock') {
                  matchesStock = row.stock.toString() !== '0';
              } else if (searchStock === 'Out of stock') {
                  matchesStock = row.stock.toString() === '0';
              } else {
                  matchesStock = true;
              }

              return matchesName && matchesCategory && matchesStock;
        });

        const handleReturn = () => {
                setSearchName('');
                setSearchCategory('');
                setSearchStock('');
        };

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
                            onClick={() => openModal(params.row)}
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
                setRows(formattedData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchProducts();
        }, []);

        const openModal = (product) => {
            setSelectedProduct(product);
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
            setSelectedProduct(null);
        };

        const handleDelete = async (id) => {
            const confirmDelete = window.confirm('Are you sure you want to delete this product?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`http://localhost:8080/products/deleteProduct?id=${id}`, {
                        method: 'POST',
                    });
                    if (response.ok) {
                        alert('Product deleted successfully');
                        fetchProducts();
                    } else {
                        alert('Failed to delete product');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the product');
                }
            }
        };
  return (
    <Paper sx={{ height: 750, width: '100%' }}>
        <div>
        <SearchProduct
             searchName={searchName}
             searchCategory={searchCategory}
             searchStock={searchStock}
             onSearchChange={handleSearchChange}
             onReturn={handleReturn}
         />
        </div>
        <br/>
        <div>
        <DataGrid
             sx={{ border: 0 }}
             rows={filteredProducts}
             columns={columns}
             loading={loading}
             initialState={{
                pagination: {
                   paginationModel: {
                          pageSize: 10,
                   },
                },
             }}
             pageSizeOptions={[10]}
             checkboxSelection
             disableRowSelectionOnClick
        />
        </div>
        <ModifyModal
             isOpen={isModalOpen}
             onRequestClose={closeModal}
             product={selectedProduct}
        />
    </Paper>
  );
}
