require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL || '*', 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

let isConnected = false; 

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error("MongoDB Connection failed:", err.message);
    }
};

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// --- 3. Routes ---
app.get('/', async (req, res) => {
    try {
        const allUsers = await UserModel.find({});
        return res.status(200).json({ users: allUsers });
    } catch (err) {
        console.error("Database fetch error:", err.message);
        return res.status(500).json({ error: "Server is currently unavailable" });
    }
});

app.get('/getUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);       
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ msg: "User Found", user: user });
    } catch (err) {
        console.error('Error fetching user:', err.message);
        return res.status(400).json({ msg: "Failed to fetch user", error: err.message });
    }
});

app.post('/createUser', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        if (!name || !email || !age) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = await UserModel.create({ name, email, age });
        return res.status(201).json({ msg: "User Created Successfully", user: newUser });
    } catch (err) {
        console.error('Error in createUser:', err.message);
        return res.status(400).json({ msg: "Bad Request", error: err.message });
    }
});

app.put('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "ID missing" });
        }
        
        const { name, email, age } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { name, email, age },
            { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ error: "User Not found" });
        }
        return res.status(200).json({ msg: "User Updated Successfully", user: updatedUser });
    } catch (err) {
        console.error('Error:', err.message);
        return res.status(400).json({ msg: "Update Failed", error: err.message });
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'User Not Found' });
        }
        return res.status(200).json({ msg: 'User Deleted Successfully', user: deletedUser });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(400).json({ msg: "Failed to Delete User", error: err.message });
    }
});

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Local server running on port ${port}`);
    });
}
module.exports = app;