require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function resetDatabase() {
    try {
        // Connect to MongoDB using MONGO_URI from .env
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/devconnect';
        console.log('Connecting to MongoDB at:', mongoUri);
        
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Delete all users
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users from the database`);

        console.log('Database reset successful!');
    } catch (err) {
        console.error('Error resetting database:', err.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

resetDatabase();
