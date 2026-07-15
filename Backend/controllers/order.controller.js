import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

// ===============================
// CREATE ORDER
// ===============================

export const createOrder = async (req, res) => {

    try {

        const userId = req.user.id;

        const cartItems = await Cart.find({ userId }).populate("productId");

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const products = cartItems.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        const totalAmount = products.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        const order = await Order.create({
            userId,
            products,
            totalAmount,
            paymentId: req.body.paymentId || "",
            paymentStatus: "Paid",
            orderStatus: "Processing"
        });

        await Cart.deleteMany({ userId });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to create order"
        });

    }

};

// ===============================
// GET MY ORDERS
// ===============================

export const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({ userId: req.user.id })
            .populate("products.productId")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });

    }

};