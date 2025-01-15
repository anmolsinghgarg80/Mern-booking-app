import express from "express";
import multer from "multer";
import { myHotels, getHotels } from "../controllers/myhotelController";
import verifyToken from "../middlewares/identification";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits:{
    fileSize:5 * 1024 * 1024 // 5MB
  }
})

router.post("/", verifyToken,upload.array("imageFiles",6), myHotels);

router.get("/",verifyToken, getHotels);

export {router as myhotelRouter};