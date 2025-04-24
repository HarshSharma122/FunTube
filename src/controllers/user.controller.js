import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import { User } from "../models/User.model.js";
import {uploadOnCloudinary} from '../utils/cloudiary.js'
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async(req, res)=>
{
    // get userdetails from frontend
    // validation
    // check if user already exits
    // check for images check for avatar
    // upload them to cloudinary, multer
    // create userobject -- create empty in db
    // remove password and refersh field from response
    //check for user creation
    // return res


    const{username, fullname, email, password} = req.body;
    if(
        [fullname, email, username, password].some((field)=> field?.trim()==="")
    ){
        throw ApiError(400, "All fields are required");
    }

    const existedUser = User.findOne({
        $or:[{ username }, { email }]
    })
    if(existedUser)
    {
        throw new ApiError(409, "User with email or uername already exits");
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req?.files.coverImage[0]?.path;
    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar)
        {
            throw new ApiError(400, "Avatar file is required");
        }


    const user = await User.create({
        fullname, 
        avatar: avatar.url,
        coverImage:coverImage.url || "",
        email,
        password,
        username:username.toLowerCase()
    })    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser)
    {
        throw new ApiError(500, "something went wrong while registration to user")
    } 

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})
export {registerUser}