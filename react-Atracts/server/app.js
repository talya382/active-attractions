import express from "express";
import ordersRoutes from "./routs/orders.js";
import connectDB from "./config/db.js";

const app = express();

// middleware לקריאת JSON
app.use(express.json());

// חיבור למסד הנתונים
connectDB();

// חיבור routes
app.use("/orders", ordersRoutes);

// הרצת השרת
app.listen(3000, () => {
    console.log("Server running on port 3000");
});