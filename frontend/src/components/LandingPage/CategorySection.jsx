import { Box, Container, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import { motion } from "framer-motion";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import KitchenIcon from "@mui/icons-material/Kitchen";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import theme from "../../theme/theme";

export default function CategorySection() {
  const categories = [
    {
      id: 1,
      name: "Fresh Produce",
      description: "Fruits, vegetables, herbs",
      icon: LocalGroceryStoreIcon,
    },
    {
      id: 2,
      name: "Dairy & Eggs",
      description: "Milk, cheese, yogurt, eggs",
      icon: BreakfastDiningIcon,
    },
    {
      id: 3,
      name: "Snacks & Beverages",
      description: "Chips, biscuits, water, juices",
      icon: FastfoodIcon,
    },
    {
      id: 4,
      name: "Pantry Staples",
      description: "Rice, pasta, oil, spices",
      icon: KitchenIcon,
    },
    {
      id: 5,
      name: "Household Essentials",
      description: "Cleaning supplies, detergents",
      icon: CleaningServicesIcon,
    },
  ];

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
              key={category.id}
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
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 6,
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
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                        color: theme.palette.primary.main,
                      }}
                    >
                      {category.icon && (
                        <category.icon
                          sx={{
                            fontSize: 80,
                            color: theme.palette.primary.main,
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
                          color: theme.palette.primary.main,
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

