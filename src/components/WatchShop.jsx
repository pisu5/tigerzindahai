import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Dummy product data with video URLs
const products = [
  { id: 1, name: 'Product 1', videoUrl: 'https://example.com/video1.mp4' },
  { id: 2, name: 'Product 2', videoUrl: 'https://example.com/video2.mp4' },
  { id: 3, name: 'Product 3', videoUrl: 'https://example.com/video3.mp4' },
];

const WatchAndShop = () => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      {/* "Watch and Shop" section */}
      <Grid container spacing={2}>
        {/* Display reels/short videos */}
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card variant="outlined">
              <video
                controls
                src={product.videoUrl}
                style={{ width: '100%' }}
                autoPlay
                muted
                loop
              />
              <CardContent>
                <Typography variant="subtitle1" component="h2">
                  {product.name}
                </Typography>
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* "Add to Cart" card view at the bottom */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', background: '#fff' }}>
        <Typography variant="h6">Cart</Typography>
        {cart.map((item) => (
          <Card key={item.id} variant="outlined" style={{ marginTop: '8px' }}>
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                {item.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WatchAndShop;
