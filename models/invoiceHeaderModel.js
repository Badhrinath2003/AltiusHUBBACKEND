const mongoose = require("mongoose");
const InvoiceItem = require("../models/invoiceItemModel").schema;
const InvoiceBillSundry = require("../models/invoiceBillSundryModel").schema;
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const invoiceHeaderSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      validate: {
        validator: (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value),
        message: (props) => `${props.value} is not a valid UUID`
      }
    },
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
