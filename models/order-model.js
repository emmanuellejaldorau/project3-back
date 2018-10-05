const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const orderSchema = new Schema({
  // document structure & rules
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [ Object  ],
  isPaid: { type: Boolean}
}, {
  // additional settings for Schema constructor function (class)
  timestamps: true,
});


const Order = mongoose.model("Order", orderSchema);


module.exports = Order;