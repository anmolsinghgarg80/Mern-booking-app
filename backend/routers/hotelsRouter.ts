import express from "express";
import { searchHotels, getHotel, getHomeHotels } from "../controllers/hotels";
import {param } from "express-validator";

const router = express.Router();

router.get("/", getHomeHotels);
router.get("/search", searchHotels );
router.get("/:id",[param("id").notEmpty().withMessage("Hotel Id is required")],getHotel);


export {router as hotelsRouter};