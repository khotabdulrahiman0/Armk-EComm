# 🛒 eCommerce Website

A full-featured eCommerce web application built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Razorpay** (INR) and **PayPal** (USD) payment gateway integration.

## 🚀 Features

- User registration and login with JWT authentication
- Product listing, filtering, and search
- Shopping cart with quantity updates
- Secure checkout with:
  - Razorpay integration for INR
  - PayPal integration for USD
- Admin panel for:
  - Adding/updating/deleting products
  - Managing orders
  - Viewing customer details
- Responsive design with modern UI using **Bootstrap**
- Cloud image upload using **Cloudinary**
- Email notifications using **Nodemailer**

## 🧰 Tech Stack

- **Frontend:** React.js, Bootstrap, Axios
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens), bcrypt.js
- **Payments:** Razorpay, PayPal REST API
- **Others:** Cloudinary, Nodemailer, dotenv, MongoDB Atlas

## 📷 Screenshots

_Add a few screenshots here showing the homepage, product list, cart, admin panel, etc._

## 📁 Folder Structure

client/ # React frontend
server/ # Node.js backend
├── models/
├── routes/
├── controllers/
├── utils/


## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/khotabdulrahiman0/ecommerce-website.git
cd ecommerce-website

2. Setup Backend
cd Backend
npm install
# Create .env file and add the required keys (see .env.example)
npm run dev

3. Setup Frontend
cd ../Frontend
npm install
npm start

🔐 Environment Variables

MONGO_URI=your_mongo_db_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
EMAIL=your_email
EMAIL_PASSWORD=your_email_password


