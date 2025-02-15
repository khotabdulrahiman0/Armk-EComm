import React from 'react'
import MyOrdersPage from './MyOrdersPage'

const Profile = () => {
  return (
    <div className='flex-grow container mx-auto p-4 md:p-6'>
        <div className="flex md:flex-row flex-col md:space-x-6 md:space-y-0">
            {/* left section */}
            <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 ">
                <h1 className='text-2xl md:text-3xl font-bold mb-4 '>john Doe</h1>
                <p className='text-lg text-gray-600 mb-4'>johndoe@gmail.com</p>
                <button className='bg-red-500 w-full py-2 text-white px-4 hover:bg-red-600 rounded'>Logout</button>
            </div>
            {/* right section */}
            <div className="w-full md:w-2/3 lg:w-34">
                <MyOrdersPage />
            </div>
        </div>
    </div>
  )
}

export default Profile