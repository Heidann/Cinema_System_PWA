import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Ticket Booking API",
      version: "1.0.0",
      description: "API documentation for Movie Ticket Booking",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

export default swaggerOptions;
