import { Response, Request } from "express";
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from "../models/hotel";
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
    const uploadPromises = imageFiles.map(async(image)=> {
      const b64 = Buffer.from(image.buffer).toString("base64")
      let dataURI= "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });  

    
    //2. if upload was successful, add the URLs to the new hotel
    const imageUrls = await Promise.all(uploadPromises);
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