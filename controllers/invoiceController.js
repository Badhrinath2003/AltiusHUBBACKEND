const Invoice = require("../models/invoiceHeaderModel");
const mongoose = require("mongoose");

// get all invoices
const getInvoices = async (req, res) => {
  const invoices = await Invoice.find({});
  res.status(200).json(workouts);
};

// create new invoiceHeader
const createInvoice = async (req, res) => {
  const { id,date,invoiceNumber,customerName,billingaddress,shippingAddress,gstin,totalAmount,invoiceItems,invoiceBillSundrys } = req.body;

  // add doc to db
  // create a new invoiceHeader document inside the Header collection
  if(validateItem(invoiceItems) && totalAmount==getTotalItems(invoiceItems)+getTotalBills(invoiceBillSundrys)){
    try {
      const invoiceHeader = await InvoiceHeader.create({ id,date,invoiceNumber,customerName,billingaddress,shippingAddress,gstin,totalAmount,invoiceItems,invoiceBillSundrys });
      res.status(200).json(invoiceHeader);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  else{
    res.status(400).json({ error: "Not Valid" });
  }
  function validateItem(items){
    for(var i=0;i<items.length;i++){
      var ob = items[i];
      if(ob.quantity*ob.price!=ob.itemAmount || ob.quantity<0 || ob.price<0 || ob.itemAmount<0){
        return false;
      }
    }
    return true;
  }
  function getTotalItems(items){
    var res = 0;
    for(var i=0;i<items.length;i++){
      res = res + ob.itemAmount;
    }
    return res;
  }
  function getTotalBills(bills){
    var res = 0;
    for(var i=0;i<bills.length;i++){
      res = res + ob.billAmount;
    }
    return res;
  }
};

// delete a workout
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
