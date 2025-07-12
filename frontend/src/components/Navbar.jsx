import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mr: 4 }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontStyle: "italic",
                fontWeight: "bold",
                letterSpacing: "0.5px",
              }}
            >
              ShopHop
            </Link>
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
        </Box>

        <IconButton color="inherit" component={Link} to="/login">
          <LoginIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
