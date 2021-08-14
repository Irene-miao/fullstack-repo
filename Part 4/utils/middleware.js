const logger = require("./logger");

// Print request info sent to server
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("---");
  next();
};

// Catch requests to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Express error handlers
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

// Get token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
     request.token =  authorization.substring(7)
  }
  
  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
