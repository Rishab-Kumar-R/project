const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).render("error", { error });
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If the error is a CastError, then the error is a 404 error
  // What is a CastError? https://mongoosejs.com/docs/api.html#mongoose_Mongoose-CastError
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // If the error is a ValidationError, then the error is a 400 error
  // What is a ValidationError? https://mongoosejs.com/docs/validation.html
  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  res.status(statusCode).render("error", { error: err });
  next(err);
};

module.exports = { notFound, errorHandler };
