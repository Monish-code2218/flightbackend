const Booking = require('../models/booking');
let User = require("../models/userDetails");
const Flight = require('../models/Flight');
const stripe = require("stripe")(process.env.STRIPE_SECRET);


require('dotenv').config();



module.exports = {
    getAllBookings: async (req, res, next) => {
        const bookings = await Booking.find().populate("flight").populate("user");
        res.status(200).json(bookings);
    },

    getBookingById: async (req, res, next) => {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        res.status(200).json(booking);
    },

    addNewBooking: async (req, res, next) => {
        const userId = req.body.user;
        const flightId = req.body.flight;
        console.log(userId, flightId);

        const flight = await Flight.findById(flightId);
        const user = await User.findById(userId);
        let bookingId = customId({
            name: flight.from + flight.to + flight.airlines,
            email: user.firstName + user.lastName,
        });
        console.log(bookingId);
        user.flights.push(flight);
        await user.save();

        const newBooking = new Booking({ bookingId, flight, user });
        const booking = await newBooking.save();
        console.log(booking);
        res.status(201).json(booking);
    },

    cancelBooking: async (req, res, next) => {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        const userId = booking.user;
        const flightId = booking.flight;
        console.log(bookingId, userId, flightId);
        const result = await Booking.findByIdAndDelete(bookingId);
        const user = await User.findById(userId);
        const flight = await Flight.findById(flightId);
        user.flights.pull(flight);
        await user.save();
        res.status(200).json({ success: "true" });
    },

    getUserDetailBookings: async (req, res, next) => {
        const { userDetailId } = req.params;
        const bookings = await Booking.find({ user: userDetailId })
            .populate("flight")
            .populate("user");
        res.status(200).json(bookings);
    },

}

