const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/products");
const products = require('./data/products'); // Assuming products data is imported here

dotenv.config();

// mongo conn.
mongoose.connect(process.env.MONGO_URI);

// Function to seed product data
const seedData = async () => {
    try {
        // Clear existing product data
        await Product.deleteMany();

        // Insert products into the database
        await Product.insertMany(products);

        console.log("Product data seeded successfully");
        process.exit();
    } catch (error) {
        console.log("Error seeding the data", error);
        process.exit(1);
    }
};

seedData();
