import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductSlice";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        discountPrice: 0,
        countInStock: 0,
        category: "Top Wear", // Default category
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [],
        isFeatured: false,
        isPublished: false,
        tags: [],
        dimensions: { length: 0, width: 0, height: 0 },
        weight: 0,
        sku: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value.split(",") });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(productData))
            .unwrap()
            .then(() => {
                navigate("/admin/products");
            })
            .catch((error) => {
                console.error("Failed to create product:", error);
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-medium mb-6">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Price</label>
                    <input
                        type="number"
                        name="discountPrice"
                        value={productData.discountPrice}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Count</label>
                    <input
                        type="number"
                        name="countInStock"
                        value={productData.countInStock}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    >
                        <option value="Top Wear">Top Wear</option>
                        <option value="Bottom Wear">Bottom Wear</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sizes (comma-separated)</label>
                    <input
                        type="text"
                        name="sizes"
                        value={productData.sizes.join(",")}
                        onChange={handleArrayChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Colors (comma-separated)</label>
                    <input
                        type="text"
                        name="colors"
                        value={productData.colors.join(",")}
                        onChange={handleArrayChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Collections</label>
                    <input
                        type="text"
                        name="collections"
                        value={productData.collections}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Material</label>
                    <input
                        type="text"
                        name="material"
                        value={productData.material}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={productData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={productData.sku}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
