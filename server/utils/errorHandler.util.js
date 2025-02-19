import boom from "boom";

// Utility function for centralized error handling
const handleError = (error, res) => {
  if (error.isBoom) {
    res.status(error.output.statusCode).json(error.output.payload);
  } else {
    const boomError = boom.internal("An unexpected error occurred", error);
    res.status(boomError.output.statusCode).json(boomError.output.payload);
  }
};

export default handleError;
