const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var bookingSchema = new Schema({
  bookingId: { type: String, required: true },
  user: {
    type: String,
    required: true,
   
  },
  flight: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Booking", bookingSchema);