import React from 'react';

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_lNwdtsMQ1UmV5A",
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "Your Company",
      description: "Test Transaction",
      handler: function (response) {
        onSuccess(response);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
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
