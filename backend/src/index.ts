import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import {authRouter} from '../routers/authRouter';

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

// Serve static files
app.use(express.static(path.join(__dirname, "../../../frontend/dist")));

app.listen(7000, () => {
  console.log("The server is running at PORT 7000");
});