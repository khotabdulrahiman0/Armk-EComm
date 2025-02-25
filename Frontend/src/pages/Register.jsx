import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import register from '../assets/register.webp';
import { registerRequestOTP, registerVerifyOTP, resendOTP } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';

const Register = () => {
    const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Verify OTP
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const guestId = useSelector((state) => state.auth.guestId);
    const cart = useSelector((state) => state.cart.cart);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products?.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : redirect, { replace: true });
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : redirect, { replace: true });
            }
        }
    }, [user, cart?.products?.length, guestId, dispatch, navigate, redirect, isCheckoutRedirect]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Step 1: Request OTP
    const handleRequestOTP = (e) => {
        e.preventDefault();
        dispatch(registerRequestOTP({ email }))
            .then((response) => {
                if (response.payload) {
                    setOtpSent(true);
                    setStep(2);
                    setCountdown(60);
                }
            });
    };

    // Step 2: Verify OTP and complete registration
    const handleVerifyOTP = (e) => {
        e.preventDefault();
        dispatch(registerVerifyOTP({ email, otp, name, password }));
    };

    // Handle Resend OTP
    const handleResendOTP = () => {
        dispatch(resendOTP({ email }))
            .then((response) => {
                if (response.payload) {
                    setCountdown(60);
                }
            });
    };

    return (
        <div className='flex min-h-screen'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 bg-white'>
                <form 
                    onSubmit={step === 1 ? handleRequestOTP : handleVerifyOTP} 
                    className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg border'
                >
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>ARMK</h2>
                    </div>
                    
                    {step === 1 ? (
                        <>
                            <h2 className='text-3xl font-bold text-center mb-4 text-gray-800'>Create Your Account</h2>
                            <p className='text-center text-gray-600 mb-6'>Enter your email to get started</p>
                            
                            <div className='mb-4'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
                                <input 
                                    type='email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black'
                                    placeholder='Enter your email address' 
                                    required 
                                />
                            </div>

                            {error && <p className='text-red-500 mb-4'>{error}</p>}

                            <button 
                                type='submit' 
                                className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all'
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'Continue with Email'}
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className='text-3xl font-bold text-center mb-4 text-gray-800'>Verify Your Email</h2>
                            <p className='text-center text-gray-600 mb-6'>We've sent a code to {email}</p>
                            
                            <div className='mb-4'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Name</label>
                                <input 
                                    type='text' 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black'
                                    placeholder='Enter your name' 
                                    required 
                                />
                            </div>
                            
                            <div className='mb-4'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
                                <input 
                                    type='password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black'
                                    placeholder='Create a password' 
                                    required 
                                />
                            </div>
                            
                            <div className='mb-4'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Verification Code</label>
                                <input 
                                    type='text' 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black'
                                    placeholder='Enter the 6-digit code' 
                                    required 
                                    maxLength={6}
                                />
                            </div>
                            
                            {error && <p className='text-red-500 mb-4'>{error}</p>}
                            
                            <button 
                                type='submit' 
                                className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all mb-4'
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Complete Registration'}
                            </button>
                            
                            <div className='text-center'>
                                {countdown > 0 ? (
                                    <p className='text-sm text-gray-500'>Resend code in {countdown}s</p>
                                ) : (
                                    <button 
                                        type='button' 
                                        onClick={handleResendOTP} 
                                        className='text-sm text-blue-600 hover:underline'
                                        disabled={loading}
                                    >
                                        Resend verification code
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    <p className='mt-6 text-center text-sm text-gray-700'>
                        Already have an account? 
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-600 hover:underline'> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
