import TokenService from "../auth/services/token-service.js";

export default function (roles) {
    return async function (req, res, next) {

        if (req.method === 'OPTIONS') {
            next()
        }
        try {

            const token = req.headers.authorization.split(' ')[1]


            if(!token) {
                return res.status(401).json({message: 'User is Unauthorized'})
            }
            const {role: userRoles} = TokenService.checkAcces(token)


            if (!userRoles) {
                return res.status(401).json({message: 'User is Unauthorized'})
            }

            let isAdmin = false

            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    isAdmin = true
                }
            })
            if (!isAdmin) {
                return res.status(403).json({message: 'You have no access'})
            }


            next()
        } catch (e) {
            console.log(e);
            return res.status(401).json({message: 'User is Unauthorized'})
        }
    }
}