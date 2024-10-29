// const express = require('express');
// const bcrypt = require('bcrypt');
// const prisma = require('../prismaClient');  // Import Prisma client
 
// const router = express.Router();
 
// // Signup route
// router.post('/signup', async (req, res) => {
//   const { username, password } = req.body;
 
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }
 
//   try {
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { username },
//     });
 
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
 
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
 
//     // Create new user in the database
//     const newUser = await prisma.user.create({
//       data: {
//         username,
//         password: hashedPassword,
//       },
//     });
 
//     return res.status(201).json({ message: 'Signup successful!', user: newUser });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error creating user', error });
//   }
// });
 
// // Login route
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
 
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }
 
//   try {
//     // Find user by username
//     const user = await prisma.user.findUnique({
//       where: { username },
//     });
 
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
 
//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
 
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
 
//     return res.status(200).json({ message: 'Login successful!' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error logging in', error });
//   }
// });
 
// module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const prisma = require('../prismaClient'); // Assuming you have Prisma client setup
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body; // Extract data from request body

    try {
        // Check if user already exists (by username or email)
        const existingUser = await prisma.user.findUnique({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this username or email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword, // Save the hashed password
            },
        });

        // Respond with success and user info
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // If any error occurs, respond with an error message
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Extract data from request body

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { username }, // Find the user by their username
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found. Please sign up first.' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // If successful login
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login', error });
    }
});

module.exports = router;
