import UserService from "../services/user-service.js";

class AuthController {
    async register (req, res) {
        try {
            const {email, password} = req.body

            const newUser = await UserService.register(email, password)

            if(newUser.status) {
                return res.status(newUser.status).json({message: newUser.message})
            }
            res.cookie('refreshToken', newUser.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(newUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await UserService.login(email, password)

            if(user.status) {
                return res.status(user.status).json({message: user.message})
            }
            res.cookie('refreshToken', user.refreshToken, {maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async logout (req, res) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')

            return res.json(token)

        } catch (e) {
            res.status(500).json(e)
        }
    }
    async refresh (req, res) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            if(userData.status) {
                return res.status(userData.status).json({message: userData.message})
            }
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async order (req, res) {
        try {
            const data = UserService.order(req.body)
            if(data.status) {
                return res.status(data.status).json({message: data.message})
            }
            return res.json(data)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new AuthController()