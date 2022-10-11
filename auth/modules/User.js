import mongoose from 'mongoose'
const { Schema } = mongoose;

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: [{type: String, ref: 'Role'}]
})

export default mongoose.model('User', User)