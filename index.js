import express from 'express';
import 'dotenv/config'; 
import mongoose from 'mongoose';
import atractionRouter from './routes/atraction.js';
// import userRouter from './routes/user.js'; // אל תשכחי לייבא גם את הראוטר של המשתמשים

const app = express();

// Middleware לקריאת JSON - הכרחי כדי לקבל נתונים ב-Post/Put
app.use(express.json()); 

// חיבור הראוטרים
app.use('/api/atraction', atractionRouter);
// app.use('/api/user', userRouter); // הכתובת להתחברות תהיה למשל /api/user/login

// הגדרת פורט
const PORT = process.env.PORT || 3000;


