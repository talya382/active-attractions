import mongoose from "mongoose";

const MinimalProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  targetDate: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  customerCode: {
    type: String,
    required: true
  },
  products: {
    type: [MinimalProductSchema],
    required: true
  },
  isShipped: {
    type: Boolean,
    default: false
  }
});

export const OrderModel = mongoose.model("orders", orderSchema);
