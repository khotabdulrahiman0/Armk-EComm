import React, { useState } from 'react';

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    countInStock: '',
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: 'Unisex',
    images: [],
    isFeatured: false,
    isPublished: false,
    tags: [],
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    weight: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };
  const handleeArrayInput = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim().toUpperCase());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.imageUrl) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { url: data.imageUrl }]
        }));
      }
    } catch (err) {
      setError('Failed to upload image');
    }
    setUploadingImage(false);
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to add product');
      }

      setSuccess('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        countInStock: '',
        sku: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: '',
        material: '',
        gender: 'Unisex',
        images: [],
        isFeatured: false,
        isPublished: false,
        tags: [],
        dimensions: {
          length: '',
          width: '',
          height: ''
        },
        weight: ''
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              name="discountPrice"
              placeholder="Discount Price"
              value={formData.discountPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              name="countInStock"
              placeholder="Count in Stock"
              value={formData.countInStock}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Top Wear">Top Wear</option>
              <option value="Bottom Wear">Bottom Wear</option>
            </select>

            <select
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>

            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Brand</option>
              <option value="Urban Threads">Urban Threads</option>
              <option value="Modern Fit">Modern Fit</option>
              <option value="Gucci">Gucci</option>
              <option value="Street Style">Street Style</option>
              <option value="Beach Breeze">Beach Breeze</option>
              <option value="Fashion Insta">Fashion Insta</option>
          </select>


            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma-separated)"
              value={formData.sizes.join(', ')}
              onChange={(e) => handleeArrayInput(e, 'sizes')}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="colors"
              placeholder="Colors (comma-separated)"
              value={formData.colors.join(', ')}
              onChange={(e) => handleArrayInput(e, 'colors')}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="collections"
              placeholder="Collection"
              value={formData.collections}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

              <select
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Material</option>
                <option value="Cotton">Cotton</option>
                <option value="Wool">Wool</option>
                <option value="Denim">Denim</option>
                <option value="Polyester">Polyester</option>
                <option value="Silk">Silk</option>
                <option value="Linen">Linen</option>
                <option value="Viscose">Viscose</option>
                <option value="Fleece">Fleece</option>
              </select>

          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2">Featured Product</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2">Published</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="w-full"
              />
              {uploadingImage && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImage}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${(loading || uploadingImage) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Adding Product...
              </div>
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;