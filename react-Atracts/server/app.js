import express from "express";
import ordersRoutes from "./routs/orders.js";
import connectDB from "./config/db.js";

// יצירת אפליקציית Express
const app = express();

// middleware לקריאת JSON מהבקשות
app.use(express.json());

// חיבור למסד הנתונים
connectDB();

// חיבור כל נתיבי ההזמנות
app.use("/orders", ordersRoutes);

// הרצת השרת
app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
});
