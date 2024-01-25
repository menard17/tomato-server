const express = require('express')
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const port = 9000;
const app = express()

app.use(bodyParser.json())

// Validation middleware for POST request
const validatePostData = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Invalid email format'),
    // Add more validation rules for other fields if needed
]

// Handling a POST request to the '/example' endpoint
app.post('/subscribe', validatePostData, (req, res) => {
    // Access the data sent in the request body
    const requestData = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    // Process the data or perform any necessary actions
    console.log('Received POST data:', requestData);
  
      // Prepare a JSON response
  const jsonResponse = {
    success: true,
    message: 'Subscribed',
  };

  // Send the JSON response
  res.json(jsonResponse);
})

app.listen(port, () => { console.log("Server started on port 5000")})