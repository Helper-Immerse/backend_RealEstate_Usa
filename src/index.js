const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const route = require('../src/Routes/routes')
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://helperimmerse:tb2ZCuXGU5yFlWDF@cluster0.m4rpepl.mongodb.net/",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MOngoDB connected successfully"))
  .catch((err) => {
    console.log(err.message);
  });
app.use("/", route);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});