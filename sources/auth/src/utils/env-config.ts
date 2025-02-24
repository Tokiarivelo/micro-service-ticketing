import dotenv from 'dotenv';

// Charger le fichier .env
dotenv.config();

export const configs = {
  jwtKey: process.env.JWT_KEY,
};
