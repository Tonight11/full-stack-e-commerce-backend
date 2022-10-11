import TokenService from "../auth/services/token-service.js";

export default function (roles) {
    return async function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]

            console.log(token, 123123)

            if(!token) {
                return res.status(401).json({message: 'User is Unauthorized'})
            }
            const {role: userRoles} = TokenService.checkAcces(token)

            console.log(userRoles)

            if (!userRoles) {
                return res.status(401).json({message: 'User is Unauthorized'})
            }

            console.log(1)
            let isAdmin = false

            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    isAdmin = true
                }
            })
            if (!isAdmin) {
                return res.status(403).json({message: 'You have no access'})
            }

            console.log(2)

            next()
        } catch (e) {
            console.log(e);
            return res.status(401).json({message: 'User is Unauthorized'})
        }
    }
}