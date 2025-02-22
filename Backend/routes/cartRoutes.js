const express = require('express')
const Cart = require("../models/cart");
const Product = require("../models/products");
const { protect , admin } = require("../middleware/authMiddleware");
const cart = require('../models/cart');
// const product = require('../models/products');

const router = express.Router()

const getCart = async(userId, guestId)=>{
    if(userId){
        return await Cart.findOne({user: userId})
    }else if(guestId){
        return await Cart.findOne({guestId});
    }
    return null
}

router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        // Determine if user is logged in or guest
        let cart = await getCart(userId, guestId);

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId && p.size === size && p.color === color
            );
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images.length > 0 ? product.images[0].url : "", // Store the first image URL
                    price: parseFloat(product.price), // Ensure price is stored as a number
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (parseFloat(item.price) * item.quantity),
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart for guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images.length > 0 ? product.images[0].url : "", // Store the first image URL
                    price: parseFloat(product.price), // Ensure price is stored as a number
                    size,
                    color,
                    quantity,
                }],
                totalPrice: parseFloat(product.price) * quantity, // Correctly calculate total price for new cart
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

router.put("/",async (req,res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId,guestId);
        if(!cart)return res.status(404).json({msg:"Cart not found."})

        const productIndex = cart.products.findIndex((p)=>p.productId.toString() === productId && p.size === size && p.color === color);
        
        if(productIndex > -1){
            // update qnty
            if(quantity > 0){
                cart.products[productIndex].quantity = quantity;
            }else{
                cart.products.splice(productIndex,1); //remove product if qnty is 0
            }
            cart.totalPrice = cart.products.reduce((acc,item) => acc + item.price * item.quantity,0);
            await cart.save()
            res.status(200).json(cart);
        }else{
            res.status(404).json({ msg: "Product not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
})

//deleting from a cart
router.delete("/",async (req,res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
try {
    let cart = await getCart(userId,guestId);

    if(!cart)return res.status(404).json({msg:"Cart not found."});

    const productIndex = cart.products.findIndex((p)=>p.productId.toString() === productId && p.size === size && p.color === color);
    if(productIndex > -1){
        cart.products.splice(productIndex,1); 

        cart.totalPrice = cart.products.reduce((acc,item) => acc + item.price * item.quantity,0)

        await cart.save();
        return res.status(200).json(cart)
    }else{
        return res.status(404).json({msg:"product not found in the cart."})
    }
} catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
}
})

// get cart
router.get("/",async (req,res) => {
    const { guestId, userId } = req.query;
    try {
        let cart = await getCart(userId,guestId);
        if(cart){
            res.json(cart);
        }else{
            res.status(404).json({msg:"cart not found."});
        }
    } catch (error) {
        console.log(error);
    res.status(500).json({ msg: "Server Error" });
    }
})

//merger carts of guest and logged in user
router.post("/merge",async (req,res) => {
    const { guestId, userId } = req.query;
try {
    //find guest cart and user cart
    const guestCart = await Cart.findOne({guestId});
    const userCart = await Cart.findOne({user:req.user._id});

    if(guestCart){
        if(guestCart.products.length === 0){
            return res.status(400).json({ msg: "Guest cart is empty" });
        }
        if(userCart){
            guestCart.products.forEach((guestItem)=>{
                const productIndex = userCart.products.findIndex((item)=> item.productId.toString() === guestItem.productId.toString() && item.size ===guestItem.size && item.color === guestItem.color);
                if(productIndex > -1){
                    userCart.products[productIndex].quantity +=guestItem.quantity;
                }else{
                    // otherwise add the guest items to the cart 
                    userCart.products.push(guestItem)
                }
            });
            userCart.totalPrice = userCart.product.reduce((acc,item) => acc + item.price * item.quantity,0);
            await userCart.save();

            //remove the guest cart after merge 
            try {
                 await cart.findOneAndDelete({guestId});
            } catch (error) {
                console.log("Error deleting guest carto",error)
            }
            res.status(200).json(userCart)
        }else{
            // if the user has no existing cart assign the guest cart to the user
            guestCart.user = req.user._id;
            guestCart.guestId = undefined;
            await guestCart.save();

            res.status(200).json(guestCart);
        }
    }else{
        if(userCart){
            //Guest cart has been already merged, return user cart
            return res.status(200).json(userCart);
        }
        res.status(404).json({msg:"Guest cart not found"});
    }

} catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
}
})

module.exports = router;