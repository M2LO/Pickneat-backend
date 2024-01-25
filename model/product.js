const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    images: {
        type: String,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// const filePath = '../data/product.json';
// async function insertData() {
//     try {
//         const jsonData = require(filePath);

//         const insertedData = await Product.insertMany(jsonData);

//         console.log('Data inserted successfully:', insertedData);
//     } catch (err) {
//         console.error('Error inserting data into MongoDB:', err);
//     }
// }

// insertData();