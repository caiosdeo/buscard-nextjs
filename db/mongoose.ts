import mongoose from 'mongoose';

const connectDB = async () => {
  try {

    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error('A variável de ambiente MONGODB_URL não está definida.');
    }

    const conn = await mongoose.connect(mongoUrl);

    console.log(`MongoDB conectado: ${conn.connection.host}`);

  } catch (err: any) {
    console.error(`Erro ao conectar ao MongoDB: ${err.message}`);
    process.exit(1); 
  }
};

export default connectDB;

