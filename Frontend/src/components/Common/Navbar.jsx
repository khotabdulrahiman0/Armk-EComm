import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Left-Logo */}
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/">ARMK</Link>
          </div>
          {/* Center Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/collections/all?gender=Men" className="text-gray-600 hover:text-gray-900">
              Men
            </Link>
            <Link to="/collections/all?gender=Women" className="text-gray-600 hover:text-gray-900">
              Women
            </Link>
            <Link to="/collections/all?category=Top Wear" className="text-gray-600 hover:text-gray-900">
              Top Wear
            </Link>
            <Link to="/collections/all?category=Bottom Wear" className="text-gray-600 hover:text-gray-900">
              Bottom Wear
            </Link>
          </div>
          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {user && user.role === "admin" && (
              <Link to="/admin" className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
                Admin
              </Link>
            )}
            <Link to="/profile" className="hover:text-gray-900">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>
            <button onClick={toggleCartDrawer} className="relative hover:text-gray-900">
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute bg-red-500 text-white text-xs rounded-full px-2 py-0.5 -top-2 -right-2">
                  {cartItemCount}
                </span>
              )}
            </button>
            {/* Search Icon */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-7 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-64 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link to="/collections/all?gender=Men" className="text-gray-600 hover:text-gray-900">
              Men
            </Link>
            <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-gray-900">
              Women
            </Link>
            <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-gray-900">
              Top Wear
            </Link>
            <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-gray-900">
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
