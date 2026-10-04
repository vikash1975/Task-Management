const bcrypt=require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }


        const exinstingUser=await User.findOne({email});

        if(exinstingUser){
            return res.status(400).json({message:"User already exists."});
        }

        const hashPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashPassword
        });

        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    } catch (error) {
        res.status(500).json({message:"Registration failed",
            error:error.message
        })
    }
}








const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login Successfully",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};




const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get profile",
            error: error.message
        });
    }
};

module.exports={registerUser,loginUser,getProfile};