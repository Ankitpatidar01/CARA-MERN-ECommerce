import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: "Username or email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const accessToken = jwt.sign(
   {
      id: user._id,
      role: user.role
   },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
   );


    // refresh token 

     const refreshToken = jwt.sign(
   {
      id: user._id,
      role: user.role
   },
   
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    // store refresh token in cookie

    res.cookie("refreshToken" , refreshToken , {
      httpOnly: true, // client side javascript cannot read this cookie
      secure: false,
      sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
    })



    // Response
    return res.status(201).json({
      message: "User registered successfully",
     user: {
         id: user._id,
         username: user.username,
         email: user.email,
         role: user.role
      },
      accessToken,
    });

  } catch (error) {
    console.log(error); // debug log

    //  Handle duplicate key (extra safety)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate email or username"
      });
    }

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}


export async function refreshToken(req, res) {

   try {

      const token = req.cookies?.refreshToken;

      if (!token) {
         return res.status(401).json({
            "message": "Session expired"
         });
      }


      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET
      );

  
      const user = await userModel.findById(decoded.id);

      
      if ( !user ||  user.refreshToken !== token) {
         return res.status(401).json({
            message: "Invalid refresh token"
         });
      }

      
      const accessToken = jwt.sign(
         { id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
      );

    
      const newRefreshToken = jwt.sign(
         { id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: "7d" }
      );

      user.refreshToken = newRefreshToken;
      await user.save();

      
      res.cookie("refreshToken", newRefreshToken, {
         httpOnly: true,
         secure: false,
         sameSite: "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
         accessToken
      });

   } catch (error) {

      console.log(error);

      return res.status(401).json({
         message: "Invalid refresh token"
      });

   }

}

export async function userLogout(req, res) {

   try {

      const user = await userModel.findById(
         req.user.id
      );

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      user.refreshToken = null;

      await user.save();

      res.clearCookie("refreshToken", {
         httpOnly: true,
         secure: false,
         sameSite: "strict"
      });

      return res.status(200).json({
         message: "Logout successful"
      });

   } catch (err) {

      console.log(err);

      return res.status(500).json({
         message: "Logout failed"
      });

   }

}

export async function login(req, res) {

   try {

      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
         return res.status(400).json({
            message: "All fields are required"
         });
      }

      // Find user
      const user = await userModel.findOne({ email });

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      // Compare password
      const isPasswordCorrect =
         await bcrypt.compare(
            password,
            user.password
         );

      if (!isPasswordCorrect) {
         return res.status(401).json({
            message: "Invalid credentials"
         });
      }

      // Generate access token
      const accessToken = jwt.sign(
         {
            id: user._id,
            role: user.role
         },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
            {
               id: user._id,
               role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
         );

      // Save refresh token in DB
      user.refreshToken = refreshToken;

      await user.save();

      // Send refresh token in cookie
      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         secure: false,
         sameSite: "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // Response
      return res.status(200).json({
         message: "Login successful",

         accessToken,

         user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
         }
      });

   } catch (error) {

      console.log(error);

      return res.status(500).json({
         message: "Internal Server Error"
      });

   }

}

