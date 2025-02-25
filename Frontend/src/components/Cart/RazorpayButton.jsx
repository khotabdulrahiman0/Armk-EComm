import React from 'react';

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amount * 100, 
      currency: "INR",
      name: "ARMK",
      description: "Test Transaction",
      handler: function (response) {
        onSuccess(response);
      },
      prefill: {
        name: "Armk",
        email: "test@example.com",
        contact: "9999955555",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700">
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
