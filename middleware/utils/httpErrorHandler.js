// middleware/httpErrorHandler.js
const httpErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
      // If headers have already been sent, delegate
      //to the default Express error handler
      return next(err);
  }

    // Default to internal server error status code (500) if
    // no status code is set
  const statusCode = err.statusCode || 500;

    res.status(statusCode).json(
	{
	    error: {
		message: err.message || 'Internal Server Error',
		status: statusCode,
	    },
	});
};

module.exports = httpErrorHandler;
