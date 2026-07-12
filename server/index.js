const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')

const app = express()
const port = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log("Connection failed", err))

// Routes
app.get('/', async (req, res) => {
    try {
        const allUsers = await UserModel.find({})
        return res.status(200).json({ users: allUsers })
    }
    catch (err) {
        console.log("Database fetch error:", err.message)
        return res.status(500).json({ error: "Server is currently unavailable" })

    }
})

app.get('/getUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({
            msg: "User Found",
            user: user
        });

    } catch (err) {
        console.error('Error fetching user:', err.message);
        return res.status(400).json({
            msg: "Failed to fetch user",
            error: err.message
        });
    }
});

app.put('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ msg: "ID missing" })
        }
        const { name, email, age } = req.body
        const updateUser = await UserModel.findByIdAndUpdate(
            id,
            { name, email, age },
            { new: true, runValidators: true }
        )
        if (!updateUser) {
            return res.status(404).json({ msg: "User Not found" })
        }
        console.log('Updated User:', updateUser)
        return res.status(200).json({
            msg: "User Updated Successfully",
            user: updateUser
        })
    } catch (err) {
        console.log('Error', err.message)
        return res.status(400).json({
            msg: "Update Failed", error: err.message
        })
    }
})

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await UserModel.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(404).json({ error: 'User Not Found' })
        }
        return res.status(200).json({
            msg: 'User Deleted Successfully',
            user: deleteUser
        })
    }
    catch (err) {
        console.log("Error:", err.message)
        return res.status(400).json({
            msg: "Failed to Delete User",
            error: err.message
        })
    }
})

app.post('/createUser', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = await UserModel.create({ name, email, age });
        return res.status(201).json({
            msg: "User Created Successfully",
            user: newUser
        });

    } catch (err) {
        console.error('Error in createUser:', err.message);
        return res.status(400).json({
            msg: "Bad Request",
            error: err.message
        });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app;

