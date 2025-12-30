import { OrderModel } from "../moduls/orsers.js";


export async function GetAllOrders(req, res) {
    try {
        // Logic to get all orders from the database
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
}
export const addOrder = async (req, res) => {
    const {
        id,
        targetDate,
        address,
        customerCode,
        products,
    } = req.body;
    if (!id || !targetDate || !address || !customerCode || !products) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products must be a non-empty array" });
    }
    for (let p of products) {
        if (!p.productsId || p.quantity <= 0) {
            return res.status(400).json({ message: "נתוני מוצר לא תקינים" });
        }
    }
    try {
        const newOrder = new order({
            id,
            targetDate,
            address,
            customerCode,
            products
        })
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({
             message: "Error creating order",
              error: error.message
             });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params; // מזהה ההזמנה
        const { userId } = req.body; // מזהה המשתמש

        if (!userId) {
            return res.status(400).json({
                 title: "Bad Request",
                  message: "userId is required"
                 });
        }

        const order = await OrderModel.findOne({ _id: id, userId });

        if (!order) {
            return res.status(404).json({
              title: "Order not found", 
              message: "No such order for this user"
             });
        }
        res.json(order);
    } catch (err) {
        return res.status(500).json({
            title: "Error retrieving order", 
            message: err.message 
        });
    }
};
export const updateOrder = async (req, res) => {
    try{
        const{id}=req.params; // מזהה ההזמנה
        const order=await OrderModel.findById(id);
        if(!order){
            return res.status(404).json({
                title:"Order not found",
                message:"No such order"
            });
        }
        order.isShipped=true;
        await order.save();
        return res.json({
            message: "Order marked as shipped",
            order
        });
    }catch(error){
        res.status(500).json({
            message: "Error updating order",
            error: error.message
        });
    }
}

// פונקציה למחיקת הזמנה
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;      // מזהה ההזמנה
        const { userId } = req.body;    // מזהה המשתמש

        // בדיקה אם userId נשלח
        if (!userId) {
            return res.status(400).json({
                title: "Bad Request",
                message: "userId is required"
            });
        }

        // מחיקת ההזמנה מהמסד רק אם היא שייכת למשתמש
        const deletedOrder = await OrderModel.findOneAndDelete({
             _id: id,
              userId
             });

        // אם ההזמנה לא נמצאה
        if (!deletedOrder) {
            return res.status(404).json({
                title: "Order not found",
                message: "No such order for this user"
            });
        }

        // החזרת מסר הצלחה
        return res.json({
            title: "Order deleted",
            message: `Order ${id} was successfully deleted`
        });

    } catch (err) {
        return res.status(500).json({
            title: "Error deleting order",
            message: err.message
        });
    }
};