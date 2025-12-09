import { Box, Container, Typography, Card, CardContent, CardMedia, CardActionArea, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import theme from "../../theme/theme";

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Bananas",
      category: "Fresh Produce",
      price: 2.5,
      image: "https://via.placeholder.com/300x300?text=Organic+Bananas",
      stock: 30,
      description: "Fresh organic bananas from local farms",
      soldCount: 15,
      featured: true,
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      category: "Pantry Staples",
      price: 3.2,
      image: "https://via.placeholder.com/300x300?text=Whole+Wheat+Bread",
      stock: 20,
      description: "Soft and healthy whole wheat bread",
      soldCount: 10,
      featured: true,
    },
    {
      id: 3,
      name: "Cheddar Cheese",
      category: "Dairy & Eggs",
      price: 5.5,
      image: "https://via.placeholder.com/300x300?text=Cheddar+Cheese",
      stock: 12,
      description: "Sharp cheddar cheese block",
      soldCount: 25,
      featured: true,
    },
    {
      id: 4,
      name: "Tomato Ketchup",
      category: "Pantry Staples",
      price: 1.8,
      image: "https://via.placeholder.com/300x300?text=Tomato+Ketchup",
      stock: 50,
      description: "Classic tomato ketchup in squeeze bottle",
      soldCount: 40,
      featured: true,
    },
  ];

  const handleAddToCart = (productId) => {
    console.log("Add to cart:", productId);
  };

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Featured Products
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Discover our most popular items
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {featuredProducts.map((product, index) => (
            <Box
              key={product.id}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 18px)" },
                maxWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
                minWidth: 0,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: "cover" }}
                    />
                    {product.soldCount > 20 && (
                      <Chip
                        label="Popular"
                        color="primary"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          fontWeight: "bold",
                        }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 0.5, textTransform: "uppercase" }}
                    >
                      {product.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        mb: 1,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {product.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.main,
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleAddToCart(product.id)}
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

