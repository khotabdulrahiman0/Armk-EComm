const express = require('express')
const Cart = require("../models/cart");
const Checkout = require("../models/Checkout");
const Product = require("../models/products");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// checkout route
router.post("/",protect,async (req,res) => {
    const {checkoutItems, shippingAddress, paymentMethod, totalPrice} = req.body

    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({msg:"No items in checkout"});
    }

    try {
        //create a checkot session
        const newCheckout = await Checkout.create({
            user:req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
        
    } catch (error) {
        console.log("checkout session creating err",error)
        res.status(500).json({msg:"Server error"})
    }
})

// pay route
router.put("/:id/pay",protect,async (req,res) => {
    const {paymentStatus,paymentDetails } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id) 

        if(!checkout){
            return res.status(404).json({msg:"No checkout found."})
        }
        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(201).json(checkout);
        }else{
            res.status(400).json({msg:"invalid payment status."});
        }

    } catch (error) {
        console.log("pay err",error)
        res.status(500).json({msg:"Server error"})
    }
})

// finalize route
router.post("/:id/finalize",protect,async (req,res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({msg:"Checkout not found"})
        }

        if(checkout.isPaid && !checkout.isFinalized){
            // create a final order
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails
            });

            // mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();
            // delete the user cart to cleanUp
            await Cart.findOneAndDelete({user:checkout.user})
            res.status(201).json(finalOrder)
        }else if(checkout.isFinalized){
            res.status(400).json({msg:"checkout already finalized"})
        }else{
            res.status(400).json({msg:"checkout is not paid"})
        }

    } catch (error) {
        console.log("pay finalize err",error)
        res.status(500).json({msg:"Server error"})
    }
})

module.exports = router; 