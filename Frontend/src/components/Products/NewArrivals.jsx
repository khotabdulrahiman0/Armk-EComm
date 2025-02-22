import React, { useEffect, useRef, useState} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios"

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals,setNewArrivals] = useState([])

  useEffect(()=>{
    const fetchNewArrivals = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
        console.log("API Response:", response.data); // Debugging

        setNewArrivals(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNewArrivals()
  },[])

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
  }, [newArrivals]);

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
            <div key={product._id} className="min-w-[70%] sm:min-w-[45%] lg:min-w-[30%] relative">
              <img className="w-full h-[250px] sm:h-[300px] object-cover rounded-lg shadow-lg" src={product.images?.[0]?.url} alt={product.name} />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
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
