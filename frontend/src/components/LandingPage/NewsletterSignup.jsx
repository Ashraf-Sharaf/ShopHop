import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import theme from "../../theme/theme";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: theme.palette.primary.main,
        color: "white",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <EmailIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
              }}
            >
              Stay updated with our latest offers, new products, and exclusive deals
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
                maxWidth: 600,
              }}
            >
              <TextField
                fullWidth
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  backgroundColor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.secondary.main,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

