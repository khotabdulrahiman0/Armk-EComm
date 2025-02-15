import React from 'react'
import { RiDeleteBin3Fill } from 'react-icons/ri'

const CartContents = () => {

    const CartProducts =[
        {
            productId: 1,
            name:"T-shirt",
            size:"M",
            color:"Red",
            quantity:1,
            price:200,
            image:"https://picsum.photos/200?random=2"
        },
        {
            productId: 3,
            name:"shirt",
            size:"L",
            color:"blue",
            quantity:1,
            price:400,
            image:"https://picsum.photos/200?random=1"
        },
    ]

  return (
    <div>
        {
            CartProducts.map((products,index)=>(
                <div className='flex items-start justify-between py-4 border-b ' key={index}>
                    <div className="flex items-center">
                        <img src={products.image} alt={products.name} className='w-20 h-24 object-cover mr-4 rounded-lg'/>
                        <div>
                            <h3>{products.name}</h3>
                            <p className='text-sm text-gray-500'>
                                size: {products.size} | color: {products.color}
                            </p>
                            <div className="flex items-center mt-2 ">
                                <button className='border rounded px-2 py-1 text-xl font-medium'>
                                    -
                                </button>
                                <span className='mx-4'>{products.quantity}</span>
                                <button className='border rounded px-2 py-1 text-xl font-medium'>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p">
                        <p>${products.price.toLocaleString()}</p>
                        <button>
                            <RiDeleteBin3Fill className='h-5 w-5 bg-gray-200 mt-2  '/>
                        </button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default CartContents