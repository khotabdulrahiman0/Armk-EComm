import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus, clearError } from '../../redux/slices/adminOrderSlice';

const OrderStatusOptions = {
    Processing: 'Processing',
    Shipped: 'Shipped',
    Delivered: 'Delivered',
    Cancelled: 'Cancelled'
};

const statusOrder = {
    Processing: 1,
    Shipped: 2,
    Delivered: 3,
    Cancelled: 3 // Treat Cancelled as final status
};

const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [statusUpdating, setStatusUpdating] = useState(null);

    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error, currentOperation } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user.role !== "admin") {
            navigate("/unauthorized");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, user, navigate]);

    useEffect(() => {
        if (error) {
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleStatusChange = async (orderId, status) => {
        try {
            setStatusUpdating(orderId);
            await dispatch(updateOrderStatus({ id: String(orderId), status })).unwrap();
        } catch (error) {
            console.error(error.message || 'Failed to update order status');
        } finally {
            setStatusUpdating(null);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            Processing: 'text-yellow-600',
            Shipped: 'text-blue-600',
            Delivered: 'text-green-600',
            Cancelled: 'text-red-600'
        };
        return colors[status] || 'text-gray-600';
    };

    if (loading && currentOperation === 'fetch') return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-4 px-3">Order ID</th>
                            <th className="py-4 px-3">Customer</th>
                            <th className="py-4 px-3">Total Price</th>
                            <th className="py-4 px-3">Status</th>
                            <th className="py-4 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => {
                                const isFinalStatus = order.status === OrderStatusOptions.Delivered || order.status === OrderStatusOptions.Cancelled;

                                return (
                                    <tr key={order._id} className='border-b hover:bg-gray-50'>
                                        <td className='py-4 px-3 font-medium text-gray-900 whitespace-nowrap'>
                                            #{order._id}
                                        </td>
                                        <td className='py-4 px-3 font-medium text-gray-900 whitespace-nowrap'>
                                            {order.user.name}
                                        </td>
                                        <td className='py-4 px-3 font-medium text-gray-900 whitespace-nowrap'>
                                            ${order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className={`py-4 px-3 font-medium whitespace-nowrap ${getStatusColor(order.status)}`}>
                                            {isFinalStatus ? (
                                                <span>{order.status}</span> // Show plain text for Delivered & Cancelled
                                            ) : (
                                                <select
                                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    disabled={statusUpdating === order._id}
                                                >
                                                    {Object.values(OrderStatusOptions)
                                                        .filter(status => statusOrder[status] >= statusOrder[order.status]) // Prevent going back
                                                        .map((status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                        </td>
                                        <td className='py-4 px-3'>
                                            {!isFinalStatus && order.status !== OrderStatusOptions.Delivered && (
                                                <button
                                                    onClick={() => handleStatusChange(order._id, OrderStatusOptions.Delivered)}
                                                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300'
                                                    disabled={statusUpdating === order._id}
                                                >
                                                    {statusUpdating === order._id ? 'Updating...' : 'Mark as Delivered'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className='p-4 text-center text-gray-500'>
                                    No Orders Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
