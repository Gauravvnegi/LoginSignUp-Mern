
import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/useDetails', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

export default connectToDatabase;
