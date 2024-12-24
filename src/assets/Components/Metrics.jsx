import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function Metrics() {
    const [rows, setRows] = useState([]); // State to hold the fetched product data
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'totalStock', headerName: 'Total Stock', width: 240 },
        { field: 'totalValue', headerName: 'Total Value', width: 240 },
        { field: 'averagePrice', headerName: 'Average Price', width: 240 }
    ];

    const fetchProducts = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await fetch('http://localhost:8080/products/getMetrics');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Await the JSON parsing
            const formattedData = data.map(categoryMetric => ({
                id: categoryMetric.category, // Add a unique id for each row
                category: categoryMetric.category,
                totalStock: categoryMetric.totalStock,
                totalValue: categoryMetric.totalValue,
                averagePrice: categoryMetric.averagePrice,
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

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}