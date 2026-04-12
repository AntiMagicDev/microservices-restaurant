const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const USERS_URL = "http://localhost:3001/users";
const MENU_URL = "http://localhost:3002/menu";

const orders = [];

// Buscar usuario por id
const findUser = async (id) =>
  (await axios.get(USERS_URL)).data.find((u) => u.id === id);
// Buscar menu por id
const findMenu = async (id) =>
  (await axios.get(MENU_URL)).data.find((m) => m.id === id);

// Retorna todas las órdenes
app.get("/orders", (req, res) => res.json(orders));

// Crea una nueva orden validando usuario y menu
app.post("/orders", async (req, res) => {
  const uid = Number(req.body.userId);
  const mid = Number(req.body.menuId);

  if (isNaN(uid) || isNaN(mid))
    return res.status(400).json({ error: "userId y menuId deben ser números" });

  try {
    if (!(await findUser(uid)))
      return res.status(404).json({ error: `Usuario con id ${uid} no existe` });

    if (!(await findMenu(mid)))
      return res.status(404).json({ error: `Comida con id ${mid} no existe` });

    const newOrder = { id: orders.length + 1, userId: uid, menuId: mid };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al conectar con otros servicios:", error.message);
    res.status(500).json({ error: "Error al conectar con otros servicios" });
  }
});

app.listen(3003, () => console.log("Orders Service running on port 3003"));
