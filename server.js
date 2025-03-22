const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulated products database (same as in the frontend)
const products = [
  {
    id: "1",
    name: "Modern Minimal Chair",
    description:
      "Elegant chair with a minimalist design, perfect for modern interiors.",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=1000&auto=format&fit=crop",
    category: "Furniture",
  },
  {
    id: "2",
    name: "Sleek Wireless Headphones",
    description:
      "Premium wireless headphones with noise cancellation and crystal clear sound.",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Ceramic Mug Set",
    description: "Set of 4 hand-crafted ceramic mugs with minimalist design.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
    category: "Kitchen",
  },
  {
    id: "4",
    name: "Smart Watch",
    description:
      "Advanced smartwatch with health monitoring and seamless connectivity.",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics",
  },
  {
    id: "5",
    name: "Premium Notebook",
    description:
      "Leather-bound notebook with premium paper for your thoughts and ideas.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    category: "Office",
  },
  {
    id: "6",
    name: "Minimalist Desk Lamp",
    description: "Adjustable desk lamp with clean lines and warm lighting.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
    category: "Lighting",
  },
  {
    id: "7",
    name: "Portable Bluetooth Speaker",
    description:
      "Compact speaker with premium sound quality and long battery life.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics",
  },
  {
    id: "8",
    name: "Geometric Plant Pot",
    description:
      "Modern geometric pot perfect for small indoor plants and succulents.",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop",
    category: "Home Decor",
  },
  {
    id: "9",
    name: "Eco-Friendly Water Bottle",
    description:
      "Sustainable stainless steel water bottle that keeps your drinks cold for 24 hours.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop",
    category: "Lifestyle",
  },
  {
    id: "10",
    name: "Minimalist Wooden Clock",
    description: "Handcrafted wooden wall clock with a sleek, modern design.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1000&auto=format&fit=crop",
    category: "Home Decor",
  },
  {
    id: "11",
    name: "Organic Cotton Throw Blanket",
    description:
      "Soft, sustainably-made throw blanket perfect for cozy evenings.",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1580301762395-83a1d3227ff0?q=80&w=1000&auto=format&fit=crop",
    category: "Home Decor",
  },
  {
    id: "12",
    name: "Bamboo Cutlery Set",
    description:
      "Eco-friendly bamboo utensils for sustainable dining on the go.",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop",
    category: "Kitchen",
  },
];

// API Routes

// Get all products
app.get("/api/products", (req, res) => {
  setTimeout(() => {
    res.json({ data: products });
  }, 800); // Simulate network delay
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
  setTimeout(() => {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ data: product });
  }, 500); // Simulate network delay
});

// Place an order
app.post("/api/orders", (req, res) => {
  setTimeout(() => {
    const { userDetails, items, total } = req.body;

    // Validate required fields
    if (!userDetails.firstName.trim()) {
      return res.status(400).json({ error: "First name is required" });
    }

    if (!userDetails.lastName.trim()) {
      return res.status(400).json({ error: "Last name is required" });
    }

    if (!userDetails.address.trim()) {
      return res.status(400).json({ error: "Address is required" });
    }

    // Generate a random order ID
    const orderId = `ORDER-${Math.floor(Math.random() * 10000)}`;

    console.log("Order placed:", { items, userDetails, total, orderId });

    res.json({
      data: {
        success: true,
        message: "Order placed successfully",
        orderId,
      },
    });
  }, 1000); // Simulate network delay
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
