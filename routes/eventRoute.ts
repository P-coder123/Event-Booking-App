import {
  EventCreate,
  getAllEvents,
  getElementById,
  deleteEventId,
  updateEvent,
  cancelEvent,
} from "../controllers/eventControllers";
import express, { Request, Response, NextFunction } from "express";

import eventValidationSchema from "../validations/eventValidation";
import validateEvent from "../middlewares/validate";

const router = express.Router();

router.post(
  "/events",
  (req: Request, res: Response, next: NextFunction) =>
    validateEvent(eventValidationSchema, req, res, next),
  EventCreate
);

router.get("/events", getAllEvents);

router.get("/getElementById/:id", getElementById);
router.delete("/delete/:id", deleteEventId);
router.patch("/update/:id", updateEvent);
router.patch("/events/:id/cancel", cancelEvent);

export default router;
