const express = require("express");
const Cart = require("../models/cart");
const Checkout = require("../models/Checkout");
const Product = require("../models/products");
const User = require("../models/user")
const Order = require("../models/Order");
const { protect , admin } = require("../middleware/authMiddleware");

const router = express.Router();

// get all orders
router.get("/",protect,admin,async (req,res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal Server Error."})
    }
})

// update orders
router.put("/:id",protect,admin,async (req,res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt; 

            const updatedOrder = await order.save();
            res.json(updatedOrder)
        }else{
            res.status(404).json({msg:"No order found."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal Server Error."})
    }
})

// delete order 
router.delete("/:id",protect,admin,async (req,res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({msg:"Order deleted"})
        }else{
            res.status(404).json({msg:"Order not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal Server Error."})
    }
})

module.exports = router;