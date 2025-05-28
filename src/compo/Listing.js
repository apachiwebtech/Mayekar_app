import React, { useState } from 'react';
import Header from './Header';
import { List, ListItem, ListItemText, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
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

  const [expanded, setExpanded] = useState({});
  const [productData, setProductData] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = { batch: '', expiry: '', quantity: '', editable: true };
      return acc;
    }, {})
  );

  const toggleInputs = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = (id) => {
    if (!productData[id].batch || !productData[id].expiry || !productData[id].quantity) {
      alert('Please fill in Batch Number, Expiry Date, and Quantity before saving.');
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
      ([, data]) => !data.batch || !data.expiry || !data.quantity
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
      <Box sx={{ padding: '20px' }}>
        <h1>Dispatch Product List (#2487)</h1>
        <List>
          {products.map((product) => (
            <ListItem key={product.id} sx={{ borderBottom: '1px solid #ccc', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <ListItemText primary={product.name} />
                <span>Qty = {product.Qty}</span>
              <IconButton onClick={() => toggleInputs(product.id)}>
                <AddIcon />
              </IconButton>
              </Box>
              {expanded[product.id] && (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '10px' }}>
                  <Box sx={{ display: 'flex', gap: 2, marginBottom: '10px' }}>
                    <TextField label="Batch Number" variant="outlined" size="small" fullWidth value={productData[product.id].batch} onChange={(e) => setProductData((prev) => ({ ...prev, [product.id]: { ...prev[product.id], batch: e.target.value } }))} disabled={!productData[product.id].editable} />
                    <TextField label="Expiry Date" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} fullWidth value={productData[product.id].expiry} onChange={(e) => setProductData((prev) => ({ ...prev, [product.id]: { ...prev[product.id], expiry: e.target.value } }))} disabled={!productData[product.id].editable} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField label="Quantity" variant="outlined" size="small" fullWidth value={productData[product.id].quantity || ''} onChange={(e) => setProductData((prev) => ({ ...prev, [product.id]: { ...prev[product.id], quantity: e.target.value } }))} disabled={!productData[product.id].editable} />
                    {productData[product.id].editable ? (
                      <button className="btn-save" onClick={() => handleSave(product.id)}>Save</button>
                    ) : (
                      <button className="btn-save" onClick={() => handleEdit(product.id)}>Edit</button>
                    )}
                  </Box>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button className="btn-submit" onClick={handleSubmit}>Submit</button>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default Listing;
