import express from "express";
const router = express.Router();

import { bookSeat } from "../controllers/bookingController";

router.post("/seatbook", bookSeat);

export default router;
