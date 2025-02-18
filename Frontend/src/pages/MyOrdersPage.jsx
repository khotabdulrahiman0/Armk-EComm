import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()
    const handleRowClick=(orderId)=>{
        navigate(`/order/${orderId}`)
    }

    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "12345",
                    createdAt: new Date().toLocaleDateString(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 1",
                            image: "https://picsum.photos/500/500?random=1"
                        },
                    ],
                    totalPrice: 100,
                    isPaid: true,
                },
                {
                    _id: "54321",
                    createdAt: new Date().toLocaleDateString(),
                    shippingAddress: { city: "Los Angeles", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 2",
                            image: "https://picsum.photos/500/500?random=2"
                        },
                    ],
                    totalPrice: 200,
                    isPaid: false,
                }
            ];
            setOrders(mockOrders);
        }, 1000);
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-gray-500 border border-gray-200">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Created</th>
                            <th className="py-3 px-4">Shipping Address</th>
                            <th className="py-3 px-4">Items</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} onClick={()=> handleRowClick(order._id)} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">
                                        <img src={order.orderItems[0].image} alt={order.orderItems[0].name} 
                                            className="w-12 h-12 object-cover rounded-md border" />
                                    </td>
                                    <td className="py-3 px-4">#{order._id}</td>
                                    <td className="py-3 px-4">{order.createdAt}</td>
                                    <td className="py-3 px-4">{order.shippingAddress.city}, {order.shippingAddress.country}</td>
                                    <td className="py-3 px-4">{order.orderItems[0].name}</td>
                                    <td className="py-3 px-4">${order.totalPrice}</td>
                                    <td className="py-3 px-4">
                                        {order.isPaid ? 
                                            <span className="text-green-600 font-semibold">Paid</span> 
                                            : 
                                            <span className="text-red-600 font-semibold">Pending</span>
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                                    You have no orders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrdersPage;
