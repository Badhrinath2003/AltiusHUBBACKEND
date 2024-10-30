const express = require("express");
const mongoose = require("mongoose");
const invoiceRoutes = require("./routes/invoices");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/invoices", invoiceRoutes);

// connect to db
mongoose
  .connect("mongodb+srv://badhrinathreddy2003:4CNVmrmqfYEOBrDt@cluster0.7km34.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "invoice",
  })
  .then(() => {
    // listen for requests
    app.listen(5000, () => {
      console.log(
        "conneted to db & listening on port " + 5000

      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
