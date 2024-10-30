const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const invoiceBillSundrySchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      validate: {
        validator: (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value),
        message: (props) => `${props.value} is not a valid UUID`
      }
    },
    billSundryName : String,
    billAmount     : mongoose.Decimal128,
  }
);

module.exports = mongoose.model("InvoiceBillSundry", invoiceBillSundrySchema);
