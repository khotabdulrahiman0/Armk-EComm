import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({products}) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product,index)=>(
            <Link key={index} to={`/product/${product._id}`} className='block'>
                <div className="bg-white p-4 rounded-lg">
                    <div className="w-full h-96 mb-4 ">
                        <img className='w-full h-full object-cover rounded-lg' src={product.images[0].url} alt={product.name}  />
                    </div>
                    <h3 className='text-sm mb-2'>
                        {product.name}
                    </h3>
                    <p className='font-medium text-gray-500 text-sm tracking-tighter '>
                        ${product.price}
                    </p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ProductGrid