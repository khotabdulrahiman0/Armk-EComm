import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    
    const { products, loading, error } = useSelector((state) => state.products);
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        // Convert search params to an object properly
        const filters = {};
        searchParams.forEach((value, key) => {
            // Only add parameters with actual values
            if (value) {
                filters[key] = value;
            }
        });

        // Add collection to filters if it exists
        const requestFilters = collection ? { collection, ...filters } : filters;
        
        console.log("Fetching products with filters:", requestFilters);
        dispatch(fetchProductsByFilters(requestFilters));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center mb-4">
                <FaFilter className="mr-2" /> Filters
            </button>

            <div ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>

            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">{collection === 'all' ? 'All Collection' : collection}</h2>
                <SortOptions />
                
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : products.length > 0 ? (
                    <ProductGrid products={products} loading={loading} error={error} />
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default CollectionPage;