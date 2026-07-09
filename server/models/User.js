const mongoose = require('mongoose')

const Userchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const UserModel = mongoose.model('users', Userchema)
module.exports = UserModel
































