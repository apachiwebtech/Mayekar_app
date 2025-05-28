import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Header from './Header';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function GoodReceiver() {
  const navigate = useNavigate();
  // Function to handle navigation on click
  const handleNavigation = () => {
    navigate('/listing');

  };
  return (
    <div>
      <Header />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Card sx={{ width: '400px', paddingTop: '10px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>Dispatch (#2487)</Typography>
                <Typography variant="h5" sx={{ fontSize: '15px' }}>Qty : 8 </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <RemoveRedEyeIcon onClick={handleNavigation} sx={{ fontSize: 45, color: 'orange', marginTop: '20px' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  );
}

export default GoodReceiver;
