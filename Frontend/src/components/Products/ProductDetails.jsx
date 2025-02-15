import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const similarProducts = [
    {
        _id:1,
        name:"Product 1",
        price:100,
        images:[{url:"https://picsum.photos/500/500?random=2"}]
    },
    {
        _id:2,
        name:"Product 2",
        price:120,
        images:[{url:"https://picsum.photos/500/500?random=3"}]
    },
    {
        _id:3,
        name:"Product 3",
        price:1003,
        images:[{url:"https://picsum.photos/500/500?random=4"}]
    },
    {
        _id:4,
        name:"Product 4",
        price:200,
        images:[{url:"https://picsum.photos/500/500?random=5"}]
    },
    
  ]

  const selectedProduct = {
    name: "Stylish Jacket",
    price: 120,
    originalPrice: 200,
    description: "This is the most stylish product",
    brand: "Armk",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black", "Blue"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish jacket 2",
      },
    ],
  };

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!(selectedSize && selectedColor));
  }, [selectedSize, selectedColor]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToCart =()=>{
    if(!selectedSize || !selectedColor){
        toast.error("Please select a size and color before adding to cart.",{
            duration:1000,
        })
        return;
    }
    setIsButtonDisabled(true);

    setTimeout(()=>{
        toast.success("Product Added to Cart.",{
            duration:1000,
        });
        setIsButtonDisabled(false);
    },500)
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row ">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`w-20 h-20 object-cover cursor-pointer rounded-lg border ${
                  mainImage === image.url
                    ? "border-black border-4"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `$${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-600 mb-2">
              ${selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all 
                    ${selectedColor === color ? "ring-2 ring-black" : ""}`}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color.toLowerCase() }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <p className="text-gray-600">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={decreaseQuantity}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
            onClick={handleAddToCart}
              className={`py-2 px-6 rounded uppercase text-center w-full mb-4 bg-black text-white ${isButtonDisabled ? "cursor-not-allowed opacity-50" :"hover:bg-gray-900" }`}
            //   disabled={isButtonDisabled}
            >
             {isButtonDisabled?"Adding" : "Add to Cart"}
            </button>

            {/* Product Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand:</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material:</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Thumbnails */}
        <div className="md:hidden flex overscroll-x-scroll space-x-4 mt-4">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText}
              className={`w-20 h-20 object-cover cursor-pointer rounded-lg border ${
                mainImage === image.url
                  ? "border-black border-4"
                  : "border-gray-300"
              }`}
              onClick={() => setMainImage(image.url)}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 border-t-4">
            <h2 className="text-2xl text-center font-medium mb-4 ">
                You May Also Like
            </h2>
            <ProductGrid products={similarProducts}/>
        </div>
    </div>
  );
};

export default ProductDetails;
