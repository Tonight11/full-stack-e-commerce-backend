import Product from "../modules/Product.js";
import fileService from "./fileService.js";

class ProductService {
    async create(post, picture) {
        const fileName = fileService.saveFile(picture)
        const createdPost = await Product.create({...post, picture: fileName})
        return createdPost
    }

    async getOne(id) {
        if (!id) {
            throw new Error('INVALID_ID')
        }
        const onePost = await Product.findById(id)
        return onePost
    }

    async update(post, picture) {
        if (!post._id) {
            throw new Error('INVALID_ID')
        }
        let updatedPost
        if (picture) {
            const fileName = fileService.saveFile(picture)
            updatedPost = await Product.findByIdAndUpdate(post._id, {...post, picture: fileName}, {new: true})
        } else {
            updatedPost = await Product.findByIdAndUpdate(post._id, post, {new: true})
        }
        return updatedPost
    }

    async delete(id) {
        if (!id) {
            throw new Error('INVALID_ID')
        }
        const deletedPost = await Product.findByIdAndDelete(id)
        return deletedPost
    }
}


export default new ProductService()