import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import RazorpayButton from './RazorpayButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {
    const [checkoutId, setCheckoutId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    // Ensure cart is loaded before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, cart.products, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "PayPal",
                    totalPrice: cart.totalPrice,
                })
            );

            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id); // Set checkout ID if checkout is successful
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            await handleFinalizeCheckout(checkoutId);
        } catch (error) {
            console.error("Payment Error:", error);
        }
    };

    const handleFinalizeCheckout = async (id) => {
        if (!id) {
            console.error("Checkout ID is missing.");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${id}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            navigate('/order-confirmation');
        } catch (error) {
            console.error("Finalize Checkout Error:", error);
        }
    };

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>;
    }

    return (
        <div className='max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Section - Shipping Details */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-700'>Contact Details</h3>
                        <input type="email" value={user ? user.email : ""} className='w-full p-3 border rounded bg-gray-100' disabled />

                        <h3 className='text-lg font-semibold text-gray-700'>Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className='w-full p-3 border rounded' value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} required />
                            <input type="text" placeholder="Last Name" className='w-full p-3 border rounded' value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} required />
                        </div>
                        <input type="text" placeholder="Address" className='w-full p-3 border rounded' value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} required />
                        <input type="text" placeholder="City" className='w-full p-3 border rounded' value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} required />
                        <input type="text" placeholder="Postal Code" className='w-full p-3 border rounded' value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} required />
                        <input type="text" placeholder="Country" className='w-full p-3 border rounded' value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} required />
                        <input type="text" placeholder="Phone Number" className='w-full p-3 border rounded' value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} required />
                    </div>

                    <div className="mt-6">
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-900'>Continue to Payment</button>
                        ) : (
                            <div>
                                <h3 className='text-lg font-semibold mb-4'>Choose Payment Method</h3>
                                <button onClick={() => setPaymentMethod("razorpay")} className={`w-full py-3 rounded-md font-semibold text-lg ${paymentMethod === "razorpay" ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Pay with Razorpay (India)</button>
                                <button onClick={() => setPaymentMethod("paypal")} className={`w-full py-3 rounded-md font-semibold text-lg ${paymentMethod === "paypal" ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Pay with PayPal (Global)</button>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Right Section - Order Summary */}
            <div className="bg-gray-50 shadow-lg rounded-lg p-6">
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>Order Summary</h3>

                {/* List of Cart Items */}
                <div className="space-y-4">
                    {cart.products.map((item) => (
                        <div key={item._id} className="flex justify-between items-center border-b pb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="text-gray-800 font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="text-gray-800 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* Subtotal, Shipping, and Total */}
                <div className="mt-6 space-y-3">
                    <div className="flex justify-between">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="text-gray-800 font-medium">${cart.totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-600">Shipping</p>
                        <p className="text-gray-800 font-medium">Free</p>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                        <p className="text-gray-800 font-semibold">Total</p>
                        <p className="text-gray-800 font-semibold">${cart.totalPrice.toFixed(2)}</p>
                    </div>
                </div>

                {/* Payment Buttons */}
                <div className="mt-6">
                    {paymentMethod === "paypal" && (
                        <PayPalButton
                            amount={cart.totalPrice}
                            onSuccess={handlePaymentSuccess}
                            onError={() => alert("PayPal Payment Failed")}
                        />
                    )}
                    {paymentMethod === "razorpay" && (
                        <RazorpayButton
                            amount={cart.totalPrice}
                            onSuccess={handlePaymentSuccess}
                            onError={() => alert("Razorpay Payment Failed")}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;