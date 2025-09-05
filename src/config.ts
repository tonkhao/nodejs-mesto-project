import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT = '3001',
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET = 'tk',
  NODE_ENV = 'production',
} = process.env;

if (!JWT_SECRET) {
  throw new Error('⚠️ Не задана переменная JWT_SECRET');
}
