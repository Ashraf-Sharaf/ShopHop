import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import HeroImage from "../../assets/HeroBackground.jpg";
import theme from "../../theme/theme";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          color: theme.palette.secondary.light,
          mt: -16,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            Welcome to ShopHop
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            paragraph
            sx={{
              fontWeight: "bold",
              textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            Your one-stop shop for daily essentials at great prices.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <Button
            variant="contained"
            size="large"
            href="/products"
            sx={{ mt: 3 }}
          >
            Shop Now
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
