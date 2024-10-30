const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceBillSundrySchema = new Schema(
  {
    id             : Schema.Types.UUID,
    billSundryName : String,
    billAmount     : mongoose.Decimal128,
  }
);

module.exports = mongoose.model("InvoiceBillSundry", invoiceBillSundrySchema);
