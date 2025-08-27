import { Request, Response, NextFunction } from "express";
import eventValidationSchema from "../validations/eventValidation";

const validateEvent = (eventValidationSchema: unknown, req: Request, res: Response, next: NextFunction) => {
  const { error } = (eventValidationSchema as any).validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validateEvent;