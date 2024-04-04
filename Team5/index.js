// index.js
/*

  Team 5:
  James FALLOUH 6171620
  Evan Sharp
  Christopher White

  Codecrater website project
  Date April, 04th 2024

*/

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
//app.use(express.static(path.join(__dirname, 'public'), { 'Content-Type': 'text/javascript' }));
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "scripts"), { type: 'text/javascript' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Route for serving the index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for handling form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = client.db('codeCrafter');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email, password });

    if (user) {
      const employeesCollection = db.collection('employees');
      const employee = await employeesCollection.findOne({ email: user.email });

      if (employee) {
        res.render('main.ejs', { firstName: employee.firstname });
        
      } else {
        res.render('main.html');
      }
    } else {
      res.redirect('/?authFailed=true');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for adding a candidate
app.post('/main/addCandidate', async (req, res) => {
  const { firstName, lastName, phone, email, seekingPosition, experience } = req.body;

  try {
   // Add candidate to MongoDB
    const db = client.db('codeCrafter');
    const candidatesCollection = db.collection('candidates');
    const result = await candidatesCollection.insertOne({ 
      firstName, 
      lastName, 
      phone, 
      email, 
      seekingPosition, 
      experience 
    });
  
      // Send success response
    res.json({ success: true, message: 'Candidate added successfully', candidate: result.ops[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add candidate' });
  }
});

// Route for retrieving candidates
app.get('/main/getCandidates', async (req, res) => {
  try {
     // Retrieve candidates from MongoDB (You need to implement this)
    const db = client.db('codeCrafter');
    const candidatesCollection = db.collection('candidates');
    const candidates = await candidatesCollection.find().toArray();
    // Send success response with candidate data
    res.json(candidates);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve candidates' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/* winston*/
import winston from 'winston';


// Create NodeJs folder if it doesn't exist
if (!fs.existsSync('NodeJs')) {
  fs.mkdirSync('NodeJs');
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Export logger for external usage
export default logger;

// Define a stream object for logging
export const stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};

// Test the logger
logger.info('test info');
logger.error('testing error');


