import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RazorpayButton from '../../components/Cart/RazorpayButton';

const cart = {
    products: [
        { name: "Product 1", price: 120 },
        { name: "Product 2", price: 75 }
    ],
    totalPrice: 195,
};

const RazorpayCheckout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null);

    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(123);
    };

    const handlePaymentSuccess = (details) => {
        console.log("Payment Successful", details);
        navigate('/order-confirmation');
    };

    return (
        <div className='max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Section - Shipping Details */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Checkout with Razorpay</h2>
                <form onSubmit={handleCreateCheckout}>
                    <button type='submit' className='w-full bg-black text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-900'>
                        Continue to Razorpay
                    </button>
                </form>
            </div>

            {/* Right Section - Razorpay Payment */}
            <div className="bg-gray-50 shadow-lg rounded-lg p-6">
                {checkoutId && (
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Complete Payment with Razorpay</h3>
                        <RazorpayButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={() => alert("Payment failed")} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RazorpayCheckout;
