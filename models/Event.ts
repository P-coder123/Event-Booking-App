
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    
    
  date: { type: Date, required: true },

  capacity: { type: Number, required: true },

  bookedSeats: { type: Number, default: 0 },

  isCanceled : { type: Boolean, default: false },

  canceledAt : { type : Date,require :true , default: null},

  canceledBy : {

    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    default : null

  }
},
{ timestamps: true }

);

const Event = mongoose.model("Event", eventSchema);

export default Event;
