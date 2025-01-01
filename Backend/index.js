const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const mainRouter = require("/Users/soham/web_Dev/Paytm/Backend/routes/index.js");

app.get("/api/v1/user/balance");
app.use("/api/v1", mainRouter);
app.use("/api/v2", v2Router);
app.listen(3000);
