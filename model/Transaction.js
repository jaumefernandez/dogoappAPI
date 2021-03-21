const mongoose = require("mongoose");

const TransSchema = mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  emailid: {
    type: String,
    required: true
  },
  emailtrans: {
    type: String,
    required: true
  },
  trans: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

// export model trans with TransSchema
module.exports = mongoose.model("transaction", TransSchema);