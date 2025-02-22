import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import register from '../assets/register.webp';
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from 'react-redux';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({name, email, password}))
    };

    return (
        <div className='flex min-h-screen'>
            {/* Left Side - Form */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 bg-white'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg border'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>ARMK</h2>
                    </div>
                    <h2 className='text-3xl font-bold text-center mb-4 text-gray-800'>Create Your Account</h2>
                    <p className='text-center text-gray-600 mb-6'>Join us and start your journey today!</p>

                    <div className='mb-4'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Name</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black'
                            placeholder='Enter your name' required />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black'
                            placeholder='Enter your email address' required />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black'
                            placeholder='Enter your password' required />
                    </div>

                    <button type='submit' className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all'>
                        Sign Up
                    </button>

                    <p className='mt-6 text-center text-sm text-gray-700'>
                        Already have an account? 
                        <Link to='/login' className='text-blue-600 hover:underline'> Login</Link>
                    </p>
                </form>
            </div>

            {/* Right Side - Image */}
            <div className='hidden md:flex w-1/2 bg-gray-900 relative'>
                <img src={register} alt='Register Illustration' className='w-full h-full object-cover opacity-80' />
                <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 px-6'>
                    <h2 className='text-4xl font-bold'>Join Us Today</h2>
                    <p className='mt-4 text-lg'>Sign up now and start your journey.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
