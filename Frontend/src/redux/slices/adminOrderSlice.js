import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`; 

const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("userToken")}`
});

const handleApiError = (error) => {
    return {
        message: error.response?.data?.message || "An error occurred",
        status: error.response?.status
    };
};

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/orders`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async (orderData, { rejectWithValue }) => {
        try {
            const { id, status } = orderData;
            const response = await axios.put(
                `${API_URL}/api/admin/orders/${id}`,
                { status },
                {
                    headers: getAuthHeader()
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Delete order
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
                headers: getAuthHeader()
            });
            return id;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Function to calculate total sales only for delivered orders
const calculateTotalSales = (orders) => {
    return orders
        .filter(order => order.status === "Delivered") // Only count delivered orders
        .reduce((acc, order) => acc + order.totalPrice, 0);
};

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
        currentOperation: null // Track current operation type
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = "fetch";
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
                state.totalSales = calculateTotalSales(action.payload); // Calculate revenue from delivered orders
                state.currentOperation = null;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.currentOperation = null;
            })
            // Update order status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = "update";
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(order => order._id === updatedOrder._id);
                
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = {
                        ...state.orders[orderIndex], 
                        status: updatedOrder.status,
                        updatedAt: updatedOrder.updatedAt
                    };
                }
                state.totalSales = calculateTotalSales(state.orders); // Recalculate revenue for delivered orders
                state.currentOperation = null;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.currentOperation = null;
            })
            // Delete order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = "delete";
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order._id !== action.payload);
                state.totalOrders = state.orders.length;
                state.totalSales = calculateTotalSales(state.orders); // Recalculate revenue for delivered orders
                state.currentOperation = null;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.currentOperation = null;
            });
    }
});

export const { clearError } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
