import ProductService from "../service/ProductService.js";

class PostController {
    async create(req, res) {
        try {
            const post = await ProductService.create(req.body, req.files.picture)
            res.json(post)
        } catch (e) {
            console.log(e)
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await ProductService.getAll()
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res) {
        try {
            const onePost = await ProductService.getOne(req.params.id)
            return res.json(onePost)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            let updatedPost
            if (req.files?.picture) {
                updatedPost = await ProductService.update(req.body, req.files.picture)
            } else {
                updatedPost = await ProductService.update(req.body)
            }
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const deletedPost = await ProductService.delete(req.params.id)
            return res.json(deletedPost)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new PostController()