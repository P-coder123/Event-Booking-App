import Joi from "joi";

const eventValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  
  date: Joi.date().greater('now').required(),
 capacity: Joi.number().integer().min(1).required(),
  bookedSeats: Joi.number().integer().min(0).default(0),

 
});

export default eventValidationSchema;
