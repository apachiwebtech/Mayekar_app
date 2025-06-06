import React, { useState } from 'react';
import Header from './Header';
import { List, ListItem, ListItemText, Box, TextField, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
function Listing() {
    const navigate = useNavigate();
    // Function to handle navigation on click
    const handleNavigation = () => {
        navigate('/home');
        console.log('Logo clicked, navigating to home');

    };
    const products = [
        { id: 1, name: 'STANDAR F HbA1c', description: 'Description of Product A', Qty: '19' },
        { id: 2, name: 'STANDAR F CRP', description: 'Description of Product B', Qty: '29' },
        { id: 3, name: 'STANDAR F STREP A Ag FIA', description: 'Description of Product C', Qty: '15' },
    ];

    const [productData, setProductData] = useState(
        products.reduce((acc, product) => {
            acc[product.id] = { batch: '', quantity: '', editable: true };
            return acc;
        }, {})
    );

    const handleSave = (id) => {
        if (!productData[id].batch || !productData[id].quantity) {
            alert('Please fill in Batch Number and Quantity before saving.');
            return;
        }

        setProductData((prev) => ({
            ...prev,
            [id]: { ...prev[id], editable: false },
        }));
    };

    const handleEdit = (id) => {
        setProductData((prev) => ({
            ...prev,
            [id]: { ...prev[id], editable: true },
        }));
    };

    const handleSubmit = () => {
        const incompleteProducts = Object.entries(productData).filter(
            ([, data]) => !data.batch || !data.quantity
        );

        if (incompleteProducts.length > 0) {
            alert('Please fill in all required fields before submitting.');
            return;
        }

        handleNavigation();
    };

    return (
        <div>
            <Header />
            <Box sx={{ padding: '10px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}> {/* Added background color and padding */}
                <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Dispatch Product List (#2487)</h4> {/* Centered and styled the title */}
                <List sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px' }}> {/* Styled the list container */}
                    {products.map((product) => (
                        <ListItem key={product.id} sx={{ borderBottom: '1px solid #eee', padding: '15px 10px', flexDirection: 'column', alignItems: 'flex-start' }}> {/* Added padding and border */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <ListItemText primary={product.name} primaryTypographyProps={{ fontWeight: 'bold', color: '#555' }} /> {/* Styled product name */}
                                <span style={{ fontSize: '14px', color: '#888' }}>Billed Qty = {product.Qty}</span> {/* Styled billed quantity */}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%', marginTop: '10px' }}> {/* Adjusted spacing */}
                                <Select
                                    value={productData[product.id].batch}
                                    onChange={(e) => setProductData((prev) => ({ ...prev, [product.id]: { ...prev[product.id], batch: e.target.value } }))}
                                    displayEmpty
                                    fullWidth
                                    disabled={!productData[product.id].editable}
                                    sx={{ height: '40px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}                                 >
                                    <MenuItem value="">Select a Batch</MenuItem>
                                    <MenuItem value="Batch 1">Batch 1</MenuItem>
                                    <MenuItem value="Batch 2">Batch 2</MenuItem>
                                    <MenuItem value="Batch 3">Batch 3</MenuItem>
                                </Select>
                                <TextField
                                    label="Received Qty"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="number"
                                    value={productData[product.id].quantity || ''}
                                    onChange={(e) => setProductData((prev) => ({ ...prev, [product.id]: { ...prev[product.id], quantity: e.target.value } }))}
                                    disabled={!productData[product.id].editable}
                                    sx={{ backgroundColor: '#f5f5f5', borderRadius: '4px' }}
                                />
                                {productData[product.id].editable ? (
                                    <button className="btn-save" style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleSave(product.id)}>Save</button>
                                ) : (
                                    <button className="btn-save" style={{ backgroundColor: '#ff9800', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleEdit(product.id)}>Edit</button>
                                )}
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button className="btn-submit" style={{ backgroundColor: '#2196f3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSubmit}>Submit</button> {/* Styled submit button */}
                </Box>
            </Box>
            <Footer />
        </div>
    );
}

export default Listing;
