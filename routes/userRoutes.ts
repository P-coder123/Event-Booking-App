import express from 'express';
const router = express.Router();


import {signUpUser} from "../controllers/userController"


router.post("/useradd",signUpUser)




export default router;