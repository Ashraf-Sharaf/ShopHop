import { Container, Typography, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Welcome to ShopHop
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your one-stop shop for daily essentials at great prices.
        </Typography>
        <Button variant="contained" size="large" href="/products">
          Shop Now
        </Button>
      </Box>
    </Container>
  );
}
