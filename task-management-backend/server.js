// task-management-backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000; // Change the port to 3000

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/task_management_db';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Task model
const Task = mongoose.model('Task', {
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  history: [{ action: String, timestamp: { type: Date, default: Date.now } }],
});

// Routes
// ... (rest of the routes remain unchanged)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
