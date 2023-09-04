import mongoose from 'mongoose';

const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI ?? '');

    console.log('MongoDB connected.');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
