import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';

const cart = {
    products: [
        {
            name: "Product 1",
            size: "M",
            color: "Blue",
            price: 120,
            image: [{ url: "https://picsum.photos/500/500?random=1" }]
        },
        {
            name: "Product 2",
            size: "L",
            color: "Red",
            price: 75,
            image: [{ url: "https://picsum.photos/500/500?random=2" }]
        },
    ],
    totalPrice: 195,
};

const Checkout = () => {
    const [checkoutId, setCheckoutId] = useState(null);
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

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
                <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-700'>Contact Details</h3>
                        <input type="email" value="user@example.com" className='w-full p-3 border rounded bg-gray-100' disabled />

                        <h3 className='text-lg font-semibold text-gray-700'>Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className='w-full p-3 border rounded' value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} required />
                            <input type="text" placeholder="Last Name" className='w-full p-3 border rounded' value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} required />
                        </div>
                        <input type="text" placeholder="Address" className='w-full p-3 border rounded' value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} required />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="City" className='w-full p-3 border rounded' value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} required />
                            <input type="text" placeholder="Postal Code" className='w-full p-3 border rounded' value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} required />
                        </div>
                        <input type="text" placeholder="Country" className='w-full p-3 border rounded' value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} required />
                        <input type="text" placeholder="Phone Number" className='w-full p-3 border rounded' value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} required />
                    </div>

                    <div className="mt-6">
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-900'>Continue to Payment</button>
                        ) : (
                            <div>
                                <h3 className='text-lg font-semibold mb-4'>Pay with PayPal</h3>
                                <PayPalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={(err) => alert("Payment failed. Try again", err)} />
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Right Section - Order Summary */}
            <div className="bg-gray-50 shadow-lg rounded-lg p-6">
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>Order Summary</h3>
                <div className="space-y-4 border-b pb-4">
                    {cart.products.map((product, index) => (
                        <div key={index} className='flex items-center justify-between'>
                            <div className="flex items-center space-x-4">
                                <img src={product.image[0].url} alt={product.name} className='w-16 h-16 object-cover rounded-lg' />
                                <div>
                                    <h3 className='text-md font-medium'>{product.name}</h3>
                                    <p className='text-gray-500 text-sm'>Size: {product.size}, Color: {product.color}</p>
                                </div>
                            </div>
                            <p className='text-lg font-semibold'>${product.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-lg font-medium space-y-2">
                    <div className='flex justify-between'>
                        <p>Subtotal:</p>
                        <p>${cart.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Shipping:</p>
                        <p>Free</p>
                    </div>
                    <div className='flex justify-between border-t pt-2 text-xl font-bold'>
                        <p>Total:</p>
                        <p>${cart.totalPrice.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
