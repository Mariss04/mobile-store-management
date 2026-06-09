const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HELPER FUNCTIONS
function readData(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

function writeData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// HOME ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ADMIN LOGIN
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  const admin = {
    username: "Mari",
    password: "4498"
  };

  if (
    username === admin.username &&
    password === admin.password
  ) {
    res.send("success");
  } else {
    res.status(401).send("fail");
  }
});

// PRODUCTS
// GET ALL PRODUCTS
app.get("/products", (req, res) => {
  const products = readData("data/products.json");
  res.json(products);
});

// ADD PRODUCT
app.post("/products", (req, res) => {
  const products = readData("data/products.json");

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    image: req.body.image,
    price: Number(req.body.price),
    qty: Number(req.body.qty || 1)
  };

  products.push(newProduct);

  writeData("data/products.json", products);

  res.json({
    message: "Product Added Successfully"
  });
});

// CART

// GET CART ITEMS
app.get("/cart", (req, res) => {
  const cart = readData("data/cart.json");
  res.json(cart);
});

// ADD TO CART
app.post("/cart", (req, res) => {
  const cart = readData("data/cart.json");
  const item = req.body;

  const existing = cart.find(
    p => p.id === item.id
  );

  if (existing) {
    existing.qty += 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }

  writeData("data/cart.json", cart);

  res.json({
    message: "Added To Cart"
  });
});

// UPDATE QTY
app.put("/cart/:id", (req, res) => {
  const cart = readData("data/cart.json");

  cart.forEach(item => {
    if (
      item.id == req.params.id &&
      req.body.qty > 0
    ) {
      item.qty = req.body.qty;
    }
  });

  writeData("data/cart.json", cart);

  res.json({
    message: "Quantity Updated"
  });
});

// DELETE ITEM
app.delete("/cart/:id", (req, res) => {
  let cart = readData("data/cart.json");

  cart = cart.filter(
    item => item.id != req.params.id
  );

  writeData("data/cart.json", cart);

  res.json({
    message: "Item Removed"
  });
});

// CHECKOUT
app.post("/checkout", (req, res) => {
  const cart = readData("data/cart.json");
  const orders = readData("data/orders.json");

  const order = {
    orderId: Date.now(),
    items: cart,
    orderDate: new Date().toLocaleString()
  };

  orders.push(order);

  writeData("data/orders.json", orders);

  // Clear cart
  writeData("data/cart.json", []);

  res.json({
    message: "Order Placed Successfully"
  });
});
// GET ORDERS
app.get("/orders", (req, res) => {
  const orders = readData("data/orders.json");
  res.json(orders);
});
// SERVER
app.listen(PORT, () => {
  console.log(
    `Server Running: http://localhost:${PORT}`
  );
});