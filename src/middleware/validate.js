const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      // Extract the first validation error message
      const firstError = error.errors[0];
      const errorMessage = firstError ? firstError.message : 'Validation failed';
      
      return res.status(400).json({ 
        error: errorMessage,
        details: error.errors 
      });
    }
  };
};

export default validate; 