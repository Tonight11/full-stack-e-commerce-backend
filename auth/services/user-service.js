import User from "../modules/User.js";
import TokenService from "./token-service.js";
import bcrypt from 'bcrypt'
import Role from "../modules/Role.js";

async function getTokens(newUser) {
    const tokens = TokenService.getTokens({user: newUser.email, id: newUser._id, role: newUser.role})
    await TokenService.saveToken(newUser._id, tokens.refreshToken, newUser.role)
    return tokens
}

class UserService {
    async register(email, password) {
        const candidate = await User.findOne({email})
        if (candidate) {
            return {
                status: 400,
                message: `User with that ${email} email has already exist`
            }
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const role = await Role.findOne({value: "manager"})
        const newUser = await User.create({email, password: hashPassword, role: [role.value]})

        const tokens = await getTokens(newUser)

        return {
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            ...tokens
        }

    }

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            return {
                status: 400,
                message: `User with ${email} doesn't exist`
            }
        }
        const isValidPassword = await bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return {
                status: 400,
                message: `The password is invalid`
            }
        }
        const tokens = await getTokens(user)
        return {
            id: user._id,
            email: user.email,
            role: user.role,
            ...tokens
        }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            return {
                status: 401,
                message: 'Unauthorized'
            }
        }
        const verifyRefresh = TokenService.checkRefresh(refreshToken)
        const existToken = await TokenService.findToken(refreshToken)

        if (!verifyRefresh || !existToken) {
            return {
                status: 401,
                message: 'Unauthorized'
            }
        }

        const user = await User.findById(verifyRefresh.id)

        const tokens = await getTokens(user)

        return {
            id: user._id,
            email: user.email,
            ...tokens
        }
    }
    async users() {
        const users = await User.find()
        return users
    }
}


export default new UserService()