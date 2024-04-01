import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname ,"public")));

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Connect to MongoDB
client.connect();
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
      // Authentication successful, redirect to main.html
      res.redirect('/main.html');
    } else {
      // Authentication failed, render login page with error message
      //res.sendFile(path.join(__dirname, 'public/index.html'));
      res.redirect('/?authFailed=true');
    
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
