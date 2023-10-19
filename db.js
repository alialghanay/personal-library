require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;


async function main() {
    try {
        await mongoose.connect(URI);
        console.log('conncation is sucssufull')
    } catch(err) {
        console.log(err)
        console.log('conncation feild')
    }
}

module.exports = main;