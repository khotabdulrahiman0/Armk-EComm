import React from 'react';
import { Link } from 'react-router-dom';
import featured from "../../assets/featured.webp";
import { ArrowRight } from 'react-feather'; // Assuming you're using react-icons

const FeaturedCollection = () => {
  return (
    <section className='py-20 px-4 lg:px-0 bg-gradient-to-b from-emerald-50 to-white'>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-6 animate-fade-in-up">
                <span className='uppercase tracking-widest text-emerald-600 font-medium'>
                    New Collection
                </span>
                <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight'>
                    Elevate Your <br className='hidden lg:block'/>Everyday Style
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl lg:pr-10'>
                    Experience premium comfort with our thoughtfully designed apparel. Crafted with sustainable materials and modern aesthetics for life's daily adventures.
                </p>
                <Link 
                    to="/collections/all" 
                    className='inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-all transform hover:-translate-y-1'
                >
                    Explore Collection
                    <ArrowRight className='w-5 h-5' />
                </Link>
            </div>

            {/* Image Content */}
            <div className="lg:w-1/2 relative group">
                <div className='relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-emerald-100/50 transition-shadow duration-300'>
                    <img 
                        src={featured} 
                        alt="Modern apparel collection" 
                        className='w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/20' />
                </div>
                
                {/* Decorative Elements */}
                <div className='hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl' />
                <div className='hidden lg:block absolute -right-16 bottom-0 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl' />
            </div>
        </div>
    </section>
  )
}

export default FeaturedCollection