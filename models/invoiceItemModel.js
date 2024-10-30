const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceItemSchema = new Schema(
  {
    id         : Schema.Types.UUID,
    itemName   : String,
    quantity   : mongoose.Decimal128,
    price      : mongoose.Decimal128,
    itemAmount : mongoose.Decimal128
  }
);

module.exports = mongoose.model("InvoiceItem", invoiceItemSchema);
