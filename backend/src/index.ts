import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import {authRouter} from '../routers/authRouter';
import {v2 as cloudinary} from 'cloudinary';
import { myhotelRouter } from '../routers/myhotelRouter';
import {hotelsRouter} from '../routers/hotelsRouter';

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then( () => {console.log("Connected ")});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true,
}));

// API routes
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({message: "hello from express endPoint!"});
});

app.use("/api/auth", authRouter);
app.use("/api/my-hotels",myhotelRouter);
app.use("/api/hotels", hotelsRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(7000, () => {
  console.log("The server is running at PORT 7000");
});