import Events from "../model/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const newEvent = new Events(req.body); // create event
    console.log(newEvent);
    const { title, description, location, startDate, endDate } = newEvent;
    console.log(title);
    if (!title || !description || !location || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }
    const eventExist = await Events.findOne({ title });
    if (eventExist) {
      return res.status(400).json({
        success: false,
        message: "Event already exist",
      });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Start date should be before end date",
      });
    }

    // check overlapping dates (same location , same time)

    const overlappingEvent = await Events.findOne({
      location,
      $or: [
        {
          startDate: { $lt: endDate },
          endDate: { $gt: startDate },
        },
      ],
    });
    console.log(overlappingEvent);
    if (overlappingEvent) {
      return res.status(400).json({
        success: false,
        message:
          "Another event is already scheduled at the same location and time",
      });
    }

    if (description.length < 30) {
      return res.status(400).json({
        success: false,
        message: "Description should be at least 30 characters",
      });
    }
    const saveEvent = await newEvent.save();
    res.status(201).json({
      saveEvent,
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Events.find();
    console.log(events);
    if (!events) {
      return res.status(404).json({
        success: false,
        message: "No events found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get events by specific id
export const getEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const eventExist = await Events.findById(id);
    if (!eventExist) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Event by ${id} - fetched successfully`,
      eventExist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update event
export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const eventExist = await Events.findById(id);
    if (!eventExist) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    const updatedEvents = await Events.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: `Event by ${id} - updated successfully`,
      updatedEvents,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  const id = req.params.id;
  const eventExist = await Events.findById(id);

  if (!eventExist) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }
  await Events.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: `Event by ${id} - deleted successfully`,
  });
};
