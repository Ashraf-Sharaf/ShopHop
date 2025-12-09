import { Box, Container, Typography, Grid, Link } from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import theme from "../../theme/theme";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/products" },
      { name: "Fresh Produce", href: "/products?category=fresh-produce" },
      { name: "Dairy & Eggs", href: "/products?category=dairy-eggs" },
      { name: "Snacks & Beverages", href: "/products?category=snacks-beverages" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2e7d32",
        color: "white",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                ShopHop
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Your one-stop shop for daily essentials at great prices. Fresh products delivered to your door.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Link href="#" color="inherit" sx={{ "&:hover": { opacity: 0.7 } }}>
                  <FacebookIcon />
                </Link>
                <Link href="#" color="inherit" sx={{ "&:hover": { opacity: 0.7 } }}>
                  <TwitterIcon />
                </Link>
                <Link href="#" color="inherit" sx={{ "&:hover": { opacity: 0.7 } }}>
                  <InstagramIcon />
                </Link>
                <Link href="#" color="inherit" sx={{ "&:hover": { opacity: 0.7 } }}>
                  <LinkedInIcon />
                </Link>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Shop
              </Typography>
              <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {footerLinks.shop.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    color="inherit"
                    underline="hover"
                    sx={{ opacity: 0.9, "&:hover": { opacity: 1 } }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Company
              </Typography>
              <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    color="inherit"
                    underline="hover"
                    sx={{ opacity: 0.9, "&:hover": { opacity: 1 } }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Support
              </Typography>
              <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {footerLinks.support.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    color="inherit"
                    underline="hover"
                    sx={{ opacity: 0.9, "&:hover": { opacity: 1 } }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            mt: 4,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} ShopHop. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

