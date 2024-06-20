const express = require("express");
const cors = require("cors");
const PORT = 3307;
const HOST = '0.0.0.0'; // or specify a particular IP address
const app = express();
const db = require("./database");
const routes = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use("/abStore", routes);

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});


