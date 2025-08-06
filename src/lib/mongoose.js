import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI_ATLAS;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI_ATLAS environment variable');
}

const connectDB = async () => {
    return mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.log({ message: "Database connected", label: "success" });
        })
        .catch((err) => {
            console.log({ message: err.message, label: "error" });
        });
};

export default connectDB;