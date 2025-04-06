import { loginUser, registerUser } from "../controllers/authController.js";
import express from "express"
const authrouter=express.Router();

authrouter.route("/register").post(registerUser);
authrouter.route("/login").post(loginUser);


export default authrouter;