import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  getEventsById,
  updateEvent,
} from "../controller/eventController.js";

const router = express.Router();

router.post("/create", createEvent);
router.get("/get-event", getEvents);
router.get("/get-event/:id", getEventsById);
router.put("/update/get-event/:id", updateEvent);
router.delete("/delete/get-event/:id", deleteEvent);
export default router;
