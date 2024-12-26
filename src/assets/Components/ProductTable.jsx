import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import ModifyModal from "./ModifyProductModal.jsx";
import ComboModify from "./ComboModify.jsx";
import SearchProduct from './SearchProduct.jsx';
import "./styles.css";

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
            { field: 'id',headerClassName: 'super-app-theme--header', headerName: 'ID', width: 90 },
            { field: 'name',headerClassName: 'super-app-theme--header', headerName: 'Name', width: 90 },
            { field: 'category',headerClassName: 'super-app-theme--header', headerName: 'Category', width: 120 },
            { field: 'price',headerClassName: 'super-app-theme--header', headerName: 'Price', width: 90 },
            { field: 'stock',headerClassName: 'super-app-theme--header', headerName: 'Stock', width: 90 },
            { field: 'expirationDate',headerClassName: 'super-app-theme--header', headerName: 'Expiration Date', width: 160 },
            {
                field: 'actions',
                headerClassName: 'super-app-theme--header',
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

    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowSelection = (newSelection) => {
            setSelectedRows(newSelection);
    };

    const getRowClassName = (params) => {
            for (const id of selectedRows) {
                    const campos = {
                        id: id,
                        newLong: 0,
                        requestType: "Stock"
                    };
                const response = fetch("http://localhost:8080/products/updateProduct", {
                                method: 'PUT',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(campos)
                            });
            };
            fetchProducts();
            return selectedRows.includes(params.id) ? 'selected-row' : '';
    };

  return (
    <Paper sx={{
        height: 750,
        width: '100%' ,
        '& .super-app-theme--header': {
             backgroundColor: 'rgba(23, 95, 200, 0.76)',
        },
    }}>
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
             sx={{
                 border: 0 ,
                 '& .MuiDataGrid-columnHeaders': {
                     color: 'white',
                 },
             }}
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
             onRowSelectionModelChange={handleRowSelection}
             getRowClassName={getRowClassName}
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
