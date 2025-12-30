import express from "express";

import {
  GetAllOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controlles/orders.js";

const router = express.Router();

// שליפת כל ההזמנות
router.get("/", GetAllOrders);

// שליפת הזמנה לפי ID
router.get("/:id", getOrderById);

// הוספת הזמנה
router.post("/", addOrder);

// מחיקה לפי ID
router.delete("/:id", deleteOrder);

//   עדכון הזמנה – יצאה לדרך

router.patch("/:id/ship", updateOrder);


export default router;
