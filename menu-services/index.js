const express = require("express");
const app = express();

app.use(express.json());

const menu = [
  { id: 1, name: "Pollo a la Plancha" },
  { id: 2, name: "Carne Asada" },
  { id: 3, name: "Pasta con Tomate" },
];

// Obtener menu
app.get("/menu", (req, res) => {
  res.json(menu);
});

app.listen(3002, () => {
  console.log("Menu Service running on port 3002");
});
