// middlewares/error.middleware.js
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    statusCode: statusCode,
    data: err.data || null,
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};

export default errorHandler;
