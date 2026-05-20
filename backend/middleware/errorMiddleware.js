export const notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.originalUrl}`
    });
  };
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      success: false,
      message: err.message || "Server Error"
    });
  };