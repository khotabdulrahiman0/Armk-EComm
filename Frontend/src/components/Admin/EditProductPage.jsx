import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const EditProductPage = () => {
    const [productData, setProductData] = useState({
        name:"",
        description:"",
        price: 0,
        countInStock: 0,
        sku:"",
        category:"",
        brand:"",
        sizes: [],
        colors: [], 
        collections:"",
        material:"",
        gender:"",
        images:[
            {
                url: "https://picsum.photos/150?random=1"

            },
            {
                url: "https://picsum.photos/150?random=2"

            },
        ]
    })
    const handlechange=(e)=>{
        const {name,value} = e.target;
        setProductData((prevData)=>({...prevData,[name]:value}))
    }
    const handleImageUpload=async(e)=>{
        const file = e.target.files[0];
        console.log(file);
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(productData);
        
    }
  return (
    <div className='mx-auto max-w-5xl p-6 shadow-md rounded-md '>
        <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
        <Link to="/admin/products" className='uppercase text-blue-500 border border-6 '>go back</Link>
        <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="mb-6">
                <label className='block mb-2 font-semibold'>Product Name</label>
                <input type="text" className='w-full border border-gray-300 rounded-md p-2 ' required name="name" value={productData.name} onChange={handlechange} />
            </div>
            {/* desc */}
            <div className="mb-6">
                <label className='block mb-2 font-semibold'>Decsription</label>
               <textarea name="description" value={productData.description} className='w-full border border-gray-300 rounded-md p-2' onChange={handlechange} rows={4} required ></textarea>
            </div>
            <div className="mb-6">
                <label className='block mb-2 font-semibold'>Price</label>
                <input type="number" className='w-full border border-gray-300 rounded-md p-2 ' required name="price" value={productData.price} onChange={handlechange} />
            </div>
            {/* count in stock */}
            <div className="mb-6">
                <label className='block mb-2 font-semibold'>Count in Stock</label>
                <input type="number" className='w-full border border-gray-300 rounded-md p-2 ' required name="countInStock" value={productData.countInStock} onChange={handlechange} />
            </div>
            {/* SKU */}
            <div className="mb-6">
                <label className='block mb-2 font-semibold'>SKU</label>
                <input type="text" className='w-full border border-gray-300 rounded-md p-2 ' required name="sku" value={productData.sku} onChange={handlechange} />
            </div>
            <div className="mb-6">
                <label className='block mb-2 font-semibold'>Sizes(comma-separated)</label>
                <input type="text" className='w-full border border-gray-300 rounded-md p-2 ' required name="sizes" value={productData.sizes.join(", ")} onChange={(e)=> setProductData({...productData,sizes:e.target.value.split(",").map((size)=> size.trim())})} />
            </div>
            <div className="mb-6">
                <label className='block mb-2 font-semibold'>Colors(comma-separated)</label>
                <input type="text" className='w-full border border-gray-300 rounded-md p-2 ' required name="colors" value={productData.colors.join(", ")} onChange={(e)=> setProductData({...productData,colors:e.target.value.split(",").map((color)=> color.trim())})} />
            </div>
            {/* image upld */}
             <div className="mb-6">
                <label className="block mb-2 font-semibold">Upload Image</label>
                <input type="file" onChange={handleImageUpload} name="" />
                <div className="flex gap-4 mt-4 ">
                    {productData.images.map((image,index)=>(
                        <div key={index}>
                            <img src={image.url} alt="Product image" className='w-20 h-20 object-cover rounded-md shadow-md ' />

                        </div>
                    ))}
                </div>
             </div>
             {/* sub butr */}
             <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors '>Update Product</button>
        </form>
    </div>
  )
}

export default EditProductPage