const AppError = require("../utils/AppError");

const notFound = (request, _response, next) => {
  next(new AppError(`Route ${request.method} ${request.originalUrl} was not found.`, 404));
};

module.exports = notFound;

