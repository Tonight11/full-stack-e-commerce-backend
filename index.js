import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './auth/router.js';
import productRouter from './product/productRouter.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use('/auth', router);
app.use(productRouter);

app.get('/', (req, res) => {
	res.end('<h1>hello from backend</h1>');
});

async function startApp() {
	try {
		await mongoose.connect(
			process.env.MONGO_DB,
			{ useUnifiedTopology: true, useNewUrlParser: true },
			() => {
				console.log('connected to dataBase');
			}
		);
		app.listen(PORT, () => console.log(`server started on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
}
startApp();
