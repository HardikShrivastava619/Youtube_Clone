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

dotenv.config({ path: resolve(__dirname, "../.env") });

// Connect to Database

connectDB(); 

const app = express();   
 
 const PORT = process.env.PORT 
                                                                    
// Middleware
app.use(cors({ 
  origin: "https://youtube-clone-v8xu.onrender.com ",  
  methods: "GET,POST,PUT,DELETE",       
  credentials: true                                             
}));
app.use(express.json());                                                                
app.use(cookieParser());  
                    
// Routes
app.use("/api/users", userRoute);    
app.use("/api/videos", videosRoute); 
app.use("/api/comments", CommentsRoute);               
app.use("/api/shorts", shortsRoute);

// Serve React Frontend        
app.use(express.static(resolve(__dirname, "../client/dist")));

app.get("*", (_, res) => {
  res.sendFile(resolve(__dirname, "../client/dist/index.html"));
});

 // Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

                              
    
                                                                    