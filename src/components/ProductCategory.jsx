import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// Styled component for the item container
const ItemContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative', // Position relative for absolute positioning of image and text
}));

// Styled component for the image
const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

// Styled component for the overlay text
const OverlayText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: 0,
  right: 0,
  color: '#fff', // Text color
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  padding: theme.spacing(1),
}));

export default function ResponsiveGrid() {
  // Dummy data for demonstration
  const dummyData = [
    { id: 1, imageUrl: 'https://www.meenabazaar.shop/cdn/shop/files/1_img.jpg?v=1704199819', text: '' },
    { id: 2, imageUrl: 'https://www.meenabazaar.shop/cdn/shop/files/2_img.jpg?v=1704199840', text: '' },
    { id: 3, imageUrl: 'https://www.meenabazaar.shop/cdn/shop/files/3_IMG.jpg?v=1704199864', text: '' },
    { id: 4, imageUrl: 'https://www.meenabazaar.shop/cdn/shop/files/4_img.jpg?v=1704199888', text: '' },
    { id: 5, imageUrl: 'https://www.meenabazaar.shop/cdn/shop/files/5_img_ef5536dd-6a13-4e18-9202-fb9b210c319d.jpg?v=1711794355', text: '' },
    { id: 6, imageUrl: 'https://www.meenabazaar.shop/cdn/shop/files/6_img_8ee80d76-5c1c-4b8e-b6c1-a04c28673b61.jpg?v=1707138496', text: ''},
    
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* Map through the dummy data to render grid items */}
        {dummyData.map((item) => (
          <Grid item xs={2} sm={4} md={4} key={item.id}>
            <ItemContainer>
              {/* Use the Image component with dynamic src */}
              <Image src={item.imageUrl} alt={`Image ${item.id}`} />
              {/* Overlay text */}
            { /*<OverlayText variant="body2">{item.text}</OverlayText>*/ }
            </ItemContainer>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
