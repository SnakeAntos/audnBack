require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 3001;
const middlewares = require("./middlewares");
const routes = require("./routes");
const db = require("./db/db");

async function checkDatabaseConnection() {
  try {
    await db.raw("SELECT 1");
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

app.use(express.json());
app.use(middlewares);
app.use("/", routes);

checkDatabaseConnection();

app.listen(port, () => {
  console.log(`Servidor escuchado exitosamente en el puerto ${port}`);
});
