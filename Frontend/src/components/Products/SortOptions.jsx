import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    
    // Create a new URLSearchParams object to preserve existing params
    const params = new URLSearchParams(searchParams);
    
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }
    
    // Use direct URL construction to avoid encoding issues
    const queryString = params.toString();
    const url = window.location.pathname + (queryString ? `?${queryString}` : '');
    navigate(url);
  };
  
  return (
    <div className='mb-4 flex items-center justify-end'>
      <select 
        id="sort" 
        onChange={handleSortChange} 
        value={searchParams.get("sortBy") || ""} 
        className='border p-2 rounded-md focus:outline-none'
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;