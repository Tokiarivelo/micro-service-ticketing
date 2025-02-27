import dotenv from 'dotenv';

// Charger le fichier .env
dotenv.config();

export const configs = {
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  mongoDbUrl: process.env.MONGO_DB_URL,
};
