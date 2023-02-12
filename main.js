const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to the database
mongoose.set('strictQuery',true);
const mongoDB = "mongodb+srv://username1:nYzSBYeX9fmd8hMU@cluster2.aepci1g.mongodb.net/hotel-database?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch(err => console.log(err))

// Room Type schema
const roomTypeSchema = new mongoose.Schema({
  name: String
});

// Room schema
const roomSchema = new mongoose.Schema({
  name: String,
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType"
  },
  price: Number
});

// Room Type model
const RoomType = mongoose.model("RoomType", roomTypeSchema);

// Room model
const Room = mongoose.model("Room", roomSchema);

// POST endpoint for storage of room types
app.post("/api/v1/rooms-types", (req, res) => {
  const roomType = new RoomType({
    name: req.body.name
  });

  roomType.save((err, roomType) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(roomType);
  });
});

// GET endpoint for fetching of all room types
app.get("/api/v1/rooms-types", (req, res) => {
  RoomType.find((err, roomTypes) => {
    if (err) return res.status(500).send(err);
    res.send(roomTypes);
  });
});

// POST endpoint for storage of rooms
app.post("/api/v1/rooms", (req, res) => {
  const room = new Room({
    name: req.body.name,
    roomType: req.body.roomType,
    price: req.body.price
  });

  room.save((err, room) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(room);
  });
});





// Room model
// const Room = mongoose.model("Room", roomSchema);

// GET endpoint for fetching all the rooms with filters
app.get("/api/v1/rooms", (req, res) => {
  const search = req.query.search;
  const roomType = req.query.roomType;
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;

  Room.find({
    name: new RegExp(search, "i"),
    roomType: roomType,
    price: { $gte: minPrice, $lte: maxPrice }
  }, (err, rooms) => {
    if (err) return res.status(500).send(err);
    res.send(rooms);
  });
});

// PATCH endpoint for editing a room using its id
app.patch("/api/v1/rooms/:id", (req, res) => {
  Room.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, room) => {
    if (err) return res.status(500).send(err);
    res.send(room);
  });
});

// DELETE endpoint for deleting a room using its id
app.delete("/api/v1/rooms/:id", (req, res) => {
  Room.findByIdAndRemove(req.params.id, (err, room) => {
    if (err) return res.status(500).send(err);
    res.send(room);
  });
});

// GET endpoint for fetching a room using its id
app.get("/api/v1/rooms/:id", (req, res) => {
  Room.findById(req.params.id, (err, room) => {
    if (err) return res.status(500).send(err);
    res.send(room);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});