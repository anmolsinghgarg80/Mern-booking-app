import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../middlewares/validate";
import User from "../models/user";
import { doHash, doHashValidation } from "../utils/hashing";
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response ): Promise<void> => {
    const { email, password } = req.body;

    try {
        const { error, value } = loginSchema.validate({ email, password });

        if (error) {
            res.status(401).json({ success: false, message: error.details[0].message });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        const result = await doHashValidation(password, user.password);

        if (!result) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1D",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        res.status(200).json({ success: true, userId : user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" }); // Changed from 400 to 500 for server errors
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const {email, password, firstName, lastName} = req.body;

  try {

    const {error} = signupSchema.validate({email,password,firstName,lastName});

    if (error) {
      res.status(401).json({ success: false, message: error.details[0].message });
      return;
    }

    let user = await User.findOne({email});

    if(user) {
      res.status(400).json({message:"User already exits"});
      return;
    }

    const hashedPassword = await doHash(password, 10);

    user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await user.save();

    const token = jwt.sign({userId: user.id},
      process.env.JWT_SECRET_KEY as string,
      {
      expiresIn:"1D",
    })

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
  });

    res.status(200).json({success: true});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
};

export const validatetoken = (req: Request, res: Response) => {
  res.status(200).send({userId: req.userId});
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie("auth_token")
  .status(200)
  .json({success: true, message: 'logged out succesfully'});
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  try{
    const user = await User.findById(userId).select("-password");

    if(!user) {
      res.status(400).json({message: "User not found"});
      return;
    }

  }catch(error) {
    console.log(error);
    res.status(500).json({message: "something went wrong"});
  }
}