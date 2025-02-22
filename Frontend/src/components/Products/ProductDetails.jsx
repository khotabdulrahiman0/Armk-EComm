import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProduct } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import tinycolor from 'tinycolor2'; // Import tinycolor2

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProduct({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  useEffect(() => {
    setIsButtonDisabled(!(selectedSize && selectedColor));
  }, [selectedSize, selectedColor]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color before adding to cart.', { duration: 1000 });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => toast.success('Product added to the cart', { duration: 1000 }))
      .finally(() => setIsButtonDisabled(false));
  };

  // Helper function to normalize and validate colors using tinycolor2
  const getValidColor = (color) => {
    const normalizedColor = tinycolor(color);
    return normalizedColor.isValid() ? normalizedColor.toHexString() : '#cccccc'; // Fallback to a default color
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText}
                  className={`w-20 h-20 object-cover cursor-pointer rounded-lg border ${
                    mainImage === image.url ? 'border-black border-4' : 'border-gray-300'
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            <div className="md:w-1/2">
              <img src={mainImage} alt="Main Product" className="w-full h-auto object-cover rounded-lg" />
            </div>
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}
              </p>
              <p className="text-xl text-gray-600 mb-2">${selectedProduct.price}</p>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => {
                    const validColor = getValidColor(color); // Get a valid CSS color
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all ${
                          selectedColor === color ? 'ring-2 ring-black' : ''
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: validColor }} // Use the valid color
                        ></div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size ? 'border-4 border-black' : 'border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-200 rounded text-lg">
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-200 rounded text-lg">
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`py-2 px-6 rounded uppercase text-center w-full mb-4 bg-black text-white ${
                  isButtonDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'
                }`}
              >
                {isButtonDisabled ? 'Select size and color' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 border-t-4">
        <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
        <ProductGrid products={similarProducts} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default ProductDetails;