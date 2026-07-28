const User = require("../models/user");

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password,
        });
        await user.save();
        res.status(201).json({
            message: "User Registered Successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if fields are empty
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // Login successful
        return res.status(200).json({
            message: "Login Successful",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// Export both functions
module.exports = { signup, login };