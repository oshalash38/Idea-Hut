const express = require('express');
const connectDB = require('./config/db');

// Init app
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Get/Define API routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/discussion', require('./routes/api/discussion'));
app.use('/api/ideas', require('./routes/api/ideas'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
