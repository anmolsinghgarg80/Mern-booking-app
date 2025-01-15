import { Response, Request } from "express";
import cloudinary from 'cloudinary';
import Hotel from "../models/hotel";
import  {HotelType} from "../shared/types";
import { hotelvalidateSchema } from "../middlewares/validate";

export const myHotels = async (req: Request, res: Response): Promise<void> => {

  const {name, city, country, description, type, pricePerNight, facilities} = req.body;

  const { error } = hotelvalidateSchema.validate({name, city, country, description, type, pricePerNight, facilities })

  if (error) {
    res.status(401).json({ success: false, message: error.details[0].message });
    return;
  }

  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel : HotelType = req.body;

    //1. Upload the images to cloudinary
    const imageUrls = await UploadImages(imageFiles);

  //2. if upload was successful, add the URLs to the new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date(); 
    newHotel.userId = req.userId;

    //3. save the new hotel in our database
    const hotel = new Hotel(newHotel);
    await hotel.save();

    //4. return a 201 status
    res.status(201).send(hotel);

  } catch (error) {
    console.log("Error creating hotel : ", error);
    res.status(500).json({message: "Something went wrong"});
  }
}

export const getHotels = async(req: Request, res: Response):Promise<void> => {

  try {
    const hotels = await Hotel.find({userId: req.userId});
    res.json(hotels);
  } catch (error) {
    res.status(500).json({message: "Error fetching hotels"})
  }
};

export const editHotels = async(req: Request, res: Response): Promise<void> => {
  const id  = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }
    res.json(hotel);

  } catch(error) {
    res.status(500).json({message:"Error fetching hotel"})
  }
};

export const updateHotel = async(req : Request, res: Response) : Promise<void> => {
  try {
    
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate({
      _id: req.params.hotelId,
      userId: req.userId,
    }, updatedHotel, {
      new: true
    }
  );

  if(!hotel) {
    res.status(404).json({message: "HOtel not found"});
    return;
  }

  const files = req.files as Express.Multer.File[];
  const updatedImageUrls = await UploadImages(files);

  hotel.imageUrls = [
    ...updatedImageUrls,
    ...(updatedHotel.imageUrls || [] )
   ];

   await hotel.save();

   res.status(201).json(hotel);

  } catch (error) {
    res.status(500).json({message: "Something went throw"});
  }
}

async function UploadImages(imageFiles: Express.Multer.File[]) {

  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

