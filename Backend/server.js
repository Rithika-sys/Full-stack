const express = require('express');
const prisma = require('./prismaClient'); // Import Prisma Client (ensure this file exists)
const login = require('./login'); // Ensure login route file exists
const register = require('./register'); // Ensure register route file exists
const cors = require('cors'); // To enable CORS

// Create an instance of express
const app = express();
const port = 3000; // Define the port

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Health check route
app.get('/', (req, res) => {
    res.send("The server is running.");
});

// Routes for login and register
app.use('/api/login', login); // Route for login
app.use('/api/register', register); // Route for registration

// Route to fetch all users (for testing purposes)
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Fetch all users from the database
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
