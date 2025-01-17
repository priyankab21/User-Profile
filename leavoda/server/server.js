const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = [
    {
      "id": 1,
      "username": "Alex DiNunzio",
      "profileImage": "/assets/images/Alex DiNunzio.png",
      "name": "Alex DiNunzio",
      "gender": "Male",
      "age": 29,
      "address": {
        "fullAddress": "402 Elm Street, Springfield, IL, 62701, USA"
      },
      "workingPlace": {
        "companyName": "Tech Solutions Inc.",
        "department": "Software Development",
        "jobTitle": "Full Stack Developer"
      },
      "contactInformation": {
        "name": "Alex DiNunzio",
        "phone": "+1 (555) ***-****",
        "email": "Alex.DiNunzio@gmail.com"
      }
    },
    {
      "id": 2,
      "username": "Priyanka Bhosle",
      "profileImage": "/assets/images/Priyanka_Animated.jpeg",
      "name": "Priyanka Bhosle",
      "gender": "Female",
      "age": 25,
      "address": {
        "fullAddress": "5678 Oak Avenue, Chicago, IL, 60616, USA"
      },
      "workingPlace": {
        "companyName": "Apex Technology",
        "department": "Frontend Development",
        "jobTitle": "Full Stack Developer"
      },
      "contactInformation": {
        "name": "Priyanka Bhosle",
        "phone": "+1 (555) ***-****",
        "email": "priyanka.bhosle@gmail.com"
      }
    }
  ]
  

app.get('/users/filter', (req, res) => {
    const { key, value } = req.query;
  
    // Check if 'key' and 'value' are provided
    if (!key || !value) {
      return res.status(400).json({ error: 'Both key and value query parameters are required' });
    }
  
    // Filter the users based on the query
    const user = users.find((user) => user[key] === value);
  
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
  
  /**
   * Route: GET /users/:id
   * Description: Fetch a user's details by ID from the dummy JSON object.
   */
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
  
    // Find the user by ID
    const user = users.find((user) => user.id === parseInt(id, 10));
  
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
