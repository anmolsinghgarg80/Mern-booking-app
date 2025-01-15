import express from "express";
import multer from "multer";
import { myHotels, getHotels, editHotels, updateHotel} from "../controllers/myhotelController";
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
router.get("/:id", verifyToken, editHotels);
router.put("/:hotelId", verifyToken, upload.array("imageFiles", 6), updateHotel);

export {router as myhotelRouter};