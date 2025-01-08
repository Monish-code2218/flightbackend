const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Routes = require("./routes/users")
const passport = require("passport");




require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json())
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
app.use(passport.initialize());
app.use(morgan("dev"));


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      swagger: "1.0",
      version: "1.0.0",
      title: "Flights API",
      description: "Flights API Information",
      contact: {
        name: "monish",
      },
      servers: ["http://localhost:" + process.env.PORT],
    },
  },
  // ['.routes/*.js']
  apis: ["./routes/*.js"],
};
const swagger = {
  swaggerDefinition: {
    info: {
      swagger: "2.0",
      version: "1.0.0",
      title: "User Details API",
      description: "It contains information of the traveller ",
      contact: {
        name: "monish",
      },
      servers: ["http://localhost:" + process.env.PORT],
    },
  },
  apis: ["./routes/*.js"],
};

var swaggerDocsUser = swaggerJsDoc(swagger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocsUser));

const swaggerDocsFlights = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocsFlights));



const flightsRouter = require("./routes/flights");

app.use("/flights", flightsRouter);


const userDetailsRouter = require("./routes/userDetails");

app.use("/users", userDetailsRouter);



app.use("/", Routes);


const bookingsRouter = require("./routes/bookings");

app.use("/bookings", bookingsRouter);

const userRouter = require("./routes/users");

app.use("/", userRouter);









app.get("/", (req, res) => {
  res.send("Welcome to the Server! 🌐");
});




connectDB();




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

