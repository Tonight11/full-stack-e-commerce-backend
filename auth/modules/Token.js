import mongoose from 'mongoose'
const { Schema } = mongoose;

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refresh: {type: String},
    role: [{type: String, ref: 'Role'}]
})

export default mongoose.model('Token', Token)