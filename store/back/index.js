const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const db=require("./database")
const routes=require("./routes/routes")

app.use(cors());
app.use(express.json());
app.use("/abStore",routes)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
