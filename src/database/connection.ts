import { connect, disconnect } from 'mongoose';

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        throw new Error('Could not connect to MongoDB');
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('MongoDB Disconnection Error:', error.message);
        throw new Error('Could not disconnect from MongoDB');
    }
}


export {connectToDatabase, disconnectFromDatabase};