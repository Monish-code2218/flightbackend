const router = require("express-promise-router")();
const BookingsController = require("../controller/bookings");
const stripe = require("stripe")(process.env.STRIPE_SECRET);


router
  .route("/")
  .get(BookingsController.getAllBookings)
  .post(BookingsController.addNewBooking);

router
  .route("/:bookingId")
  .get(BookingsController.getBookingById)
  .delete(BookingsController.cancelBooking);

router
  .route("/userDetails/:userDetailId")
  .get(BookingsController.getUserDetailBookings);





module.exports = router;