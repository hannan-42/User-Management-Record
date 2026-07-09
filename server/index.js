const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')

const app = express()
const port = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/crud')
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log("Connection failed", err)
    })

// Routes
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then((users) => {
            return res.status(201).json({ msg: "User Found", users })
        })
        .catch((err) => {
            return res.status(400).json({ msg: "Try Again Updating", err })
        })
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({ msg: "ID missing" })
    }
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedUser => {
            console.log('Updated User:', updatedUser)
            res.status(200).json({
                msg: "User Updated Successfully", user: updatedUser
            })
        })
        .catch(err => {
            console.error('Error:', err.message)
            res.status(400).json({ msg: "Update Failed", error: err.message })
        })
})
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(res => console.log(res))
        .catch(err => console.log(err))
})
app.post('/createUser', async (req, res) => {
    UserModel.create(req.body)
        .then((users) => {
            return res.status(201).json({ msg: "User Created Successfuly" })
        })
        .catch((err) => {
            return res.status(400).json({ msg: "Bad Request", err })
        })
})



app.listen(port, () => {
    console.log('Server Started')
})



