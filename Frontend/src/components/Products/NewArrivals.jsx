import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrivals = [
    { productId: 1, name: "Blue T-shirt", price: 200, image: { url: "https://picsum.photos/500/500?random=8" } },
    { productId: 2, name: "Black Shirt", price: 259, image: { url: "https://picsum.photos/500/500?random=9" } },
    { productId: 3, name: "White Hoodie", price: 299, image: { url: "https://picsum.photos/500/500?random=10" } },
    { productId: 4, name: "Denim Jacket", price: 499, image: { url: "https://picsum.photos/500/500?random=11" } },
    { productId: 5, name: "Casual Sneakers", price: 350, image: { url: "https://picsum.photos/500/500?random=12" } },
    { productId: 6, name: "Stylish Watch", price: 1200, image: { url: "https://picsum.photos/500/500?random=13" } },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      updateScrollButtons();
    }

    return () => {
      if (container) container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <section className="relative px-4 sm:px-8">
      <div className="container mx-auto text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Explore New Arrivals</h2>
        <p className="text-sm sm:text-lg text-gray-600">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge.
        </p>
      </div>

      {/* Scrollable Content with Buttons */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-300 text-black shadow-md z-10 sm:p-3 ${
            !canScrollLeft && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!canScrollLeft}
        >
          <FiChevronLeft className="text-2xl sm:text-3xl" />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide px-2 sm:px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newArrivals.map((product) => (
            <div key={product.productId} className="min-w-[70%] sm:min-w-[45%] lg:min-w-[30%] relative">
              <img className="w-full h-[250px] sm:h-[300px] object-cover rounded-lg shadow-lg" src={product.image.url} alt={product.name} />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 rounded-b-lg">
                <Link to={`/product/${product.productId}`} className="block">
                  <h4 className="font-medium text-sm sm:text-base">{product.name}</h4>
                  <p className="text-sm sm:text-base">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-300 text-black shadow-md z-10 sm:p-3 ${
            !canScrollRight && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!canScrollRight}
        >
          <FiChevronRight className="text-2xl sm:text-3xl" />
        </button>
      </div>

      {/* Hide Scrollbar for Webkit Browsers */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default NewArrivals;
