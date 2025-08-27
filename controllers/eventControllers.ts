import { Request, Response } from "express";
import Event from "../models/Event";
import User from "../models/User";
import { date } from "joi";
import { now } from "mongoose";

export const EventCreate = async (req: Request, res: Response) => {
  console.log("Received request to create event");
  const { name, date, capacity, bookedSeats } = req.body;
  console.log("Request body:", req.body);

  // validate required fields (matches schema: capacity is required)
  if (!name || !date || capacity === undefined || capacity === null) {
    return res
      .status(400)
      .json({ message: "name, date and capacity are required" });
  }

  try {
    const existingEvents = await Event.findOne({ name, date });
    if (existingEvents) {
      return res
        .status(400)
        .json({ message: "Event with the same name and date already exists" });
    }

    const eventDate = new Date(date);
    const today = new Date();

    if (eventDate < today) {
      return res
        .status(400)
        .json({ message: "Event date must be in the future" });
    }

    const newEvent = new Event({
      name,

      date,
      capacity,
      bookedSeats: 0,
    });

    await newEvent.save();
    return res
      .status(200)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error: any) {
    console.error("Error creating event:", error?.message ?? error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const upcommingEvents = await Event.find({ date: { $gt: now } }).sort({
      date: 1,
    });

    if (upcommingEvents.length == 0) {
      console.log("No upcoming events found", upcommingEvents);
      return res.status(404).json({ message: "No upcoming events found" });
    }

    return res.status(200).json({
      "Message ": "event fetch sucessfully",
      allevents: upcommingEvents,
    });
  } catch (error: any) {
    console.log("Error in fetcing upcommings events", error?.message ?? error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getElementById = async (req, res) => {
  const id = req.params.id;

  console.log("id he h ", id);

  const eventsfetchById = await Event.findById(id);
  console.log("eventsfetchByIdeventsfetchById", eventsfetchById);

  if (!eventsfetchById) {
    console.log("Please enter correct id");
    return res.status(404).json({ message: "id not matched" });
  }

  return res.status(200).json({ message: "Event get by id", eventsfetchById });

  // try {

  //   const eventsfetchById = await Event.findById(id);

  //   if(!eventsfetchById){
  //      console.log("Please enter correct id");
  //    return res.status(404).json({message : "id not matched"})
  //   }

  //     return res.status(200).json({message : "Event get by id",eventsfetchById});

  // } catch (error) {

  // }
};

export const deleteEventId = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteEvent = await Event.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: " event deleted", Id: deleteEvent });
  } catch (error) {
    console.log("Error in fetcing upcommings events", error?.message ?? error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  const id = req.params.id;
  console.log("Update event ", id);

  try {
    const updateData = req.body;

    const updateIdItem = await Event.findById(id);
    console.log(updateIdItem);

    if(updateIdItem.isCanceled){
      return res.status(401).json({message : " Event alredy canceled you can not update event"})
    }

    if (updateIdItem ) {
      const updateUser = await Event.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      res
        .status(200)
        .json({ message: "User updated successfully", user: updateUser });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error in fetcing upcommings events", error?.message ?? error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelEvent = async (req, res) => {
  console.log("Event cancel ho gaya");

  try {
    const id = req.params.id;
    const { userId } = req.body;

    const user = await User.findById(userId);

    console.log("useruseruseruser", user);
   

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can cancel events" });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.isCanceled) {
      return res
        .status(400)
        .json({ message: " event already canceled ", event });
    }

    event.isCanceled = true;
    event.canceledAt = new Date();
    event.canceledBy = userId;

   
    console.log(event.canceledBy)

    await event.save();

    return res
      .status(200)
      .json({ message: " Event cancelled successfully", event });
  } catch (error) {
    console.log("Error in fetcing upcommings events", error?.message ?? error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//event cancel hone ke baad admin update na kre
