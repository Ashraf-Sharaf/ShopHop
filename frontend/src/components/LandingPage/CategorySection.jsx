import { useState, useEffect } from "react";
import { Box, Container, Typography, Card, CardContent, CardActionArea, CircularProgress, Alert } from "@mui/material";
import { motion } from "framer-motion";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import KitchenIcon from "@mui/icons-material/Kitchen";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import theme from "../../theme/theme";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getIconComponent = (iconName) => {
  const iconMap = {
    LocalGroceryStoreIcon: LocalGroceryStoreIcon,
    BreakfastDiningIcon: BreakfastDiningIcon,
    FastfoodIcon: FastfoodIcon,
    KitchenIcon: KitchenIcon,
    CleaningServicesIcon: CleaningServicesIcon,
  };
  return iconMap[iconName] || LocalGroceryStoreIcon;
};

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/categories`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const mappedCategories = data.map((category) => ({
          ...category,
          icon: getIconComponent(category.icon),
        }));
        
        setCategories(mappedCategories);
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          py: 8,
          backgroundColor: theme.palette.background.default,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          py: 8,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Alert severity="error">
            Failed to load categories: {error}
          </Alert>
        </Container>
      </Box>
    );
  }

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
            Shop by Category
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Explore our wide range of products
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
            flexWrap: { xs: "nowrap", sm: "wrap" },
          }}
        >
          {categories.map((category, index) => (
            <Box
              key={category._id || category.id || index}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(20% - 19.2px)" },
                minWidth: 0,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: 3,
                    border: `2px solid ${category.cardColor}`,
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 6,
                      border: `3px solid ${category.cardColor}`,
                    },
                  }}
                >
                  <CardActionArea sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                        backgroundColor: category.backgroundColor,
                        color: category.iconColor,
                      }}
                    >
                      {category.icon && (
                        <category.icon
                          sx={{
                            fontSize: 80,
                            color: category.iconColor,
                          }}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: category.cardColor,
                        }}
                      >
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

