import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

function StockReport() {

  const products = [
    { id: 1, name: 'STANDAR F HbA1c', description: 'Description of Product A', quantity: 19, consumer: 0 },
    { id: 2, name: 'STANDAR F CRP', description: 'Description of Product B', quantity: 29, consumer: 0 },
    { id: 3, name: 'STANDAR F STREP A Ag FIA', description: 'Description of Product C', quantity: 15, consumer: 0 }

  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Stock Report</h1>
        <TextField
          label="Search Product"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '4px' }}
        />
        <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>

                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Consumer</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Pending</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.consumer}</TableCell>
                  <TableCell>{product.quantity - product.consumer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </div>
  );
}

export default StockReport;
