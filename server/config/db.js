import { connect } from 'mongoose';
import { mongoURI } from './urls.js';
// connect(mongoURI)
//     .then(() => console.log('Database connected successfully'))
//     .catch(err => console.log("Failed to connect to database", err))

export const connectDB = async () => {
    try {
        const conn = await connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}