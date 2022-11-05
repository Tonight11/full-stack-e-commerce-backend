import mongoose from 'mongoose';

const Product = new mongoose.Schema({
	category: { type: String, required: true },
	name: { type: String, required: true },
	desc: { type: String, required: true },
	price: { type: String, required: true },
	size: { type: Array, default: [] },
	picture: { type: Object, required: true },
});

export default mongoose.model('Product', Product);
