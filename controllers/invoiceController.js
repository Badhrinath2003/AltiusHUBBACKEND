const Invoice = require("../models/invoiceHeaderModel");
const mongoose = require("mongoose");

// get all invoices
const getInvoices = async (req, res) => {
  const invoices = await Invoice.find({});
  res.status(200).json(invoices);
};

// create new invoiceHeader
const createInvoice = async (req, res) => {
  const { id,date,invoiceNumber,customerName,billingAddress,shippingAddress,gstin,totalAmount,invoiceItems,invoiceBillSundrys } = req.body;

  // add doc to db
  // create a new invoiceHeader document inside the Header collection
  if(validateItem(invoiceItems) && parseInt(totalAmount.toString(), 10)==getTotalItems(invoiceItems)+getTotalBills(invoiceBillSundrys)){
    try {
      const invoiceHeader = await Invoice.create({ id,date,invoiceNumber,customerName,billingAddress,shippingAddress,gstin,totalAmount,invoiceItems,invoiceBillSundrys });
      res.status(200).json(invoiceHeader);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  else{
    console.log(validateItem(invoiceItems)+"\n"+getTotalItems(invoiceItems)+"\n"+getTotalBills(invoiceBillSundrys)+"\n"+parseInt(totalAmount.toString(), 10))
    res.status(400).json({ error: "Not Valid" });
  }
  // functions to validate
  function validateItem(items){
    for(var i=0;i<items.length;i++){
      var ob = items[i];
      var quantity = parseInt(ob.quantity.toString(), 10)
      var price = parseInt(ob.price.toString(), 10)
      var itemAmount = parseInt(ob.itemAmount.toString(), 10)
      if(price*quantity!=itemAmount || quantity<0 || price<0 || itemAmount<0){
        return false;
      }
    }
    return true;
  }
  function getTotalItems(items){
    var res = 0;
    for(var i=0;i<items.length;i++){
      var ob = items[i];
      res = res + parseInt(ob.itemAmount.toString(), 10);
    }
    return res;
  }
  function getTotalBills(bills){
    var res = 0;
    for(var i=0;i<bills.length;i++){
      var ob = bills[i];
      res = res + parseInt(ob.billAmount.toString(), 10);
    }
    return res;
  }
};

// delete a invoice
const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findOneAndDelete({ _id: id }); // return the deleted document

  if (!invoice) {
    return res.status(404).json({ error: "No such invoice" });
  }
  res.status(200).json(invoice);
};

// update a invoice
const updateInvoice = async (req, res) => {
  const { id } = req.params;


  // returns the original invoice not the updated one
  const invoice = await Invoice.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!invoice) {
    return res.status(404).json({ error: "No such invoice" });
  }

  res.status(200).json(invoice); // original invoice
};

module.exports = {
  getInvoices,
  createInvoice,
  deleteInvoice,
  updateInvoice,
}
