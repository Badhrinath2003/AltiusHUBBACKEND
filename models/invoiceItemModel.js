const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const invoiceItemSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      validate: {
        validator: (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value),
        message: (props) => `${props.value} is not a valid UUID`
      }
    },
    itemName   : String,
    quantity   : mongoose.Decimal128,
    price      : mongoose.Decimal128,
    itemAmount : mongoose.Decimal128
  }
);

module.exports = mongoose.model("InvoiceItem", invoiceItemSchema);
