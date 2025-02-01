const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schedulingRoutes = require("./routes/scheduling");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/api/scheduling', schedulingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
