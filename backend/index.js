const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
    getUserHistory, 
    getUserOverview, 
    postNewTransaction 
  } = require("./controllers/userHistoryController");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/check", (req, res) => {
    return res.status(200).json({ message: "API working" });
});

// Get the overview of the data
app.get("/overview", getUserOverview)

// GET transaction history
app.get("/history", getUserHistory)

// Add a transaction to the Db
app.post("/new", postNewTransaction)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
