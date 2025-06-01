import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        category: '',
        gender: '',
        color: '',
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    });

    const categories = ['Top Wear', 'Bottom Wear'];
    const colors = ['Red', 'Blue', 'Black', 'Green', 'Yellow', 'Gray', 'White', 'Pink', 'Beige', 'Navy'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const materials = ['Cotton', 'Wool', 'Denim', 'Polyester', 'Silk', 'Linen', 'Viscose', 'Fleece'];
    const brands = ['Urban Threads', 'Modern Fit', 'Gucci', 'Street Style', 'Beach Breeze', 'Fashion Insta'];
    const genders = ['Men', 'Women'];

    const clearFilters = () => {
        setFilter({
            category: '',
            gender: '',
            color: '',
            size: [],
            material: [],
            brand: [],
            minPrice: 0,
            maxPrice: 100,
        });
        
        // Clear all search params but preserve the current path
        navigate(window.location.pathname);
    };
    
    useEffect(() => {
        // Initialize filters from URL parameters
        const newFilters = {
            category: searchParams.get('category') || '',
            gender: searchParams.get('gender') || '',
            color: searchParams.get('color') || '',
            size: searchParams.get('size') ? searchParams.get('size').split(',') : [],
            material: searchParams.get('material') ? searchParams.get('material').split(',') : [],
            brand: searchParams.get('brand') ? searchParams.get('brand').split(',') : [],
            minPrice: searchParams.get('minPrice') || 0,
            maxPrice: searchParams.get('maxPrice') || 100,
        };
        
        setFilter(newFilters);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filter };

        if (type === 'checkbox') {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else if (name === "color") {
            // Handle color selection (toggle on/off)
            newFilters[name] = newFilters[name] === value ? '' : value;
        } else {
            newFilters[name] = value;
        }

        setFilter(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        // Create a new URLSearchParams object
        const params = new URLSearchParams();
        
        // Only add non-empty parameters
        if (newFilters.category) params.set('category', newFilters.category);
        if (newFilters.gender) params.set('gender', newFilters.gender);
        if (newFilters.color) params.set('color', newFilters.color);
        
        if (newFilters.size && newFilters.size.length > 0) 
            params.set('size', newFilters.size.join(','));
        
        if (newFilters.material && newFilters.material.length > 0) 
            params.set('material', newFilters.material.join(','));
        
        if (newFilters.brand && newFilters.brand.length > 0) 
            params.set('brand', newFilters.brand.join(','));
        
        if (newFilters.minPrice && newFilters.minPrice > 0) 
            params.set('minPrice', newFilters.minPrice);
        
        if (newFilters.maxPrice && newFilters.maxPrice < 100) 
            params.set('maxPrice', newFilters.maxPrice);
        
        // Preserve sortBy parameter if it exists
        const sortBy = searchParams.get('sortBy');
        if (sortBy) params.set('sortBy', sortBy);
        
        // Use direct URL construction to avoid encoding issues
        const queryString = params.toString();
        const url = window.location.pathname + (queryString ? `?${queryString}` : '');
        navigate(url);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h3>

            {/* Category Filter */}
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Category</h4>
                {categories.map((category) => (
                    <div key={category} className="flex items-center mb-2">
                        <input
                            type="radio"
                            value={category}
                            onChange={handleFilterChange}
                            checked={filter.category === category}
                            name="category"
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))}
            </div>

            {/* Gender Filter */}
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Gender</h4>
                {genders.map((gender) => (
                    <div key={gender} className="flex items-center mb-2">
                        <input
                            type="radio"
                            value={gender}
                            onChange={handleFilterChange}
                            checked={filter.gender === gender}
                            name="gender"
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{gender}</span>
                    </div>
                ))}
            </div>

            {/* Color Filter */}
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => {
                                // Create a mock event object
                                const mockEvent = {
                                    target: {
                                        name: 'color',
                                        value: color
                                    }
                                };
                                handleFilterChange(mockEvent);
                            }}
                            className={`w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-all ${filter.color === color ? "ring-2 ring-blue-500" : ""}`}
                            style={{ backgroundColor: color.toLowerCase() }}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                        <div key={size} className="flex items-center">
                            <input
                                type="checkbox"
                                value={size}
                                onChange={handleFilterChange}
                                checked={filter.size.includes(size)}
                                name="size"
                                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                            />
                            <span className="text-gray-700">{size}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Material Filter */}
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Material</h4>
                {materials.map((material) => (
                    <div key={material} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            value={material}
                            onChange={handleFilterChange}
                            checked={filter.material.includes(material)}
                            name="material"
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{material}</span>
                    </div>
                ))}
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Brand</h4>
                {brands.map((brand) => (
                    <div key={brand} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            value={brand}
                            onChange={handleFilterChange}
                            checked={filter.brand.includes(brand)}
                            name="brand"
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{brand}</span>
                    </div>
                ))}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Price Range</h4>
                <input
                    type="range"
                    name="maxPrice"
                    min={0}
                    max={100}
                    value={filter.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-gray-600 mt-2">
                    <span>$0</span>
                    <span>${filter.maxPrice}</span>
                </div>
            </div>
            <button
                onClick={clearFilters}
                className="w-full mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all">
                Clear Filters
            </button>
        </div>
    );
};

export default FilterSidebar;