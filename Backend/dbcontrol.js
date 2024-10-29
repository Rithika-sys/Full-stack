// //  Import the Prisma Client
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const insertRecord = async (req, res) => {
//     const { name, username, email, password } = req.body; // Extract fields from request body
//     try {
//         // Check if the username already exists
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 username,
//             },
//         });

//         if (existingUser) {
//             return res.status(400).send("Username already taken. Please choose a different username.");
//         }

//         // Check if the email already exists
//         const existingEmail = await prisma.user.findUnique({
//             where: {
//                 email,
//             },
//         });

//         if (existingEmail) {
//             return res.status(400).send("Email already registered. Please choose a different email.");
//         }

//         // Create a new user record
//         const user = await prisma.user.create({
//             data: {
//                 name,
//                 username,
//                 email,
//                 password,
//             },
//         });
//         res.status(200).send("The record was inserted successfully");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred while inserting the record");
//     }
// };

// const validate = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 username: username,
//             },
//         });
//         if (user) {
//             // Verify password 
//             if (user.password === password) { 
//                 res.status(200).send("You are logged in successfully");
//             } else {
//                 res.status(401).send("Invalid password");
//             }
//         } else {
//             res.status(404).send("The user doesn't exist");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred during validation");
//     }
// };

// const record = async (req, res) => {
//     try {
//         const users = await prisma.user.findMany(); // Fetch all users
//         res.status(200).json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred while fetching users");
//     }
// };

// module.exports = {
//     insertRecord,
//     validate,
//     record,
// };

// Import the Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertRecord = async (req, res) => {
    const { name, username, email, password } = req.body; // Extract fields from request body
    try {
        // Check if the username already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (existingUser) {
            return res.status(400).send("Username already taken. Please choose a different username.");
        }

        // Check if the email already exists
        const existingEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingEmail) {
            return res.status(400).send("Email already registered. Please choose a different email.");
        }

        // Create a new user record
        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password,
            },
        });
        res.status(200).send({
            isCreated:true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while inserting the record");
    }
};

const validate = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (user) {
            // Verify password 
            if (user.password === password) { 
                res.status(200).send({isValid:true});
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            res.status(404).send("The user doesn't exist");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during validation");
    }
};

const record = async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching users");
    }
};

module.exports = {
    insertRecord,
    validate,
    record,
};
