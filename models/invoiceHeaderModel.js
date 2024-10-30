const mongoose = require("mongoose");
const InvoiceItem = require("../models/invoiceItemModel");
const InvoiceBillSundry = require("../models/invoiceBillSundry");
const Schema = mongoose.Schema;
const invoiceHeaderSchema = new Schema(
  {
    id : Schema.Types.UUID,
    date : String,
    invoiceNumber : Number,
    customerName : String,
    billingAddress : String,
    shippingAddress : String,
    gstin : String,
    totalAmount : mongoose.Decimal128,
    invoiceItems : [InvoiceItem],
    invoiceBillSundrys : [InvoiceBillSundry]
  }
);

module.exports = mongoose.model("InvoiceHeader", invoiceHeaderSchema);
