const express = require("express");
const axios = require("axios");
const app = express();

// Redirigir a Users Service
app.get("/users", async (req, res) => {
  const response = await axios.get("http://localhost:3001/users");
  res.json(response.data);
});

// Redirigir a menu Service
app.get("/menu", async (req, res) => {
  const response = await axios.get("http://localhost:3002/menu");
  res.json(response.data);
});

//Redirigir a gateway
app.get("/orders", async (req, res) => {
  const response = await axios.get("http://localhost:3003/orders");
  res.json(response.data);
});

app.listen(3000, () => {
  console.log("Gateway running on port 3000");
});
