const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
  };
};

export default validate; 