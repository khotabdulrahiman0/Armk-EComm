import React from 'react'
import menCollectionImage from "../../assets/mens-collection.webp"
import womenCollectionImage from "../../assets/womens-collection.webp"
import { Link } from 'react-router-dom'

const GenderCollectionSection = () => {
  return (
    <div>
        <section className='py-16 px-4 lg:px-0 '>
            <div className="container mx-auto flex flex-col md:flex-row gap-8 ">
                <div className="relative flex-1 ">
                    <img src={womenCollectionImage} className='w-full h-[700px] object-cover ' alt="Women's collections" />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className='text-2xl font-bold text-gray-900 mb-3 '>
                            Women's Collection
                        </h2>
                        <Link to="/collections/all?gender=Women">
                             Shop Now 
                        </Link>
                    </div>
                </div>
                {/* Mens collections */}
                   <div className="relative flex-1 ">
                    <img src={menCollectionImage} className='w-full h-[700px] object-cover ' alt="Women's collections" />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className='text-2xl font-bold text-gray-900 mb-3 '>
                            Men's Collection
                        </h2>
                        <Link to="/collections/all?gender=Men">
                             Shop Now 
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default GenderCollectionSection