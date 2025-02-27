import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import videosRoute from './routes/videosRoute.js';
import cookieParser from 'cookie-parser';
import CommentsRoute from './routes/CommentsRoute.js';
import shortsRoute from './routes/ShortsRoute.js';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, "../.env") });

// Connect to Database
connectDB();

const app = express();   
const PORT = process.env.PORT 

// Middleware
app.use(cors({ 
  origin: 'http://localhost:5173',  
  methods: "GET,POST,PUT,DELETE",       
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(userRoute);
app.use(videosRoute);
app.use(CommentsRoute);
app.use(shortsRoute);

// Serve React Frontend
app.use(express.static(resolve(__dirname, "../client/dist")));

app.get("*", (_, res) => {
  res.sendFile(resolve(__dirname, "../client/dist/index.html"));
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



                                  