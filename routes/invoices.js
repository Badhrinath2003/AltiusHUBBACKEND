const express = require("express");
const {
  getInvoices,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

// GET all Invoices
router.get("/", getInvoices);

// POST a new Invoice
router.post("/", createInvoice);


// DELETE a Invoice
router.delete("/:id", deleteInvoice);

// UPDATE a Invoice
router.patch("/:id", updateInvoice);

module.exports = router;
