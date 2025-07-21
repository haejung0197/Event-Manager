import express from "express";
import {
  createEvent,
  getEvents,
  getEventsById,
} from "../controller/eventController.js";

const router = express.Router();

router.post("/create", createEvent);
router.get("/read", getEvents);
router.get("/read/:id", getEventsById);
export default router;
