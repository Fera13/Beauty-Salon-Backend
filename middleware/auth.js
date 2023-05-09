const jwt = require("jsonwebtoken")

function checkRole(role) {
    return function(req, res, next) {
      const userRole = req.user.role
      console.log(userRole, role);
      if (!role.includes(userRole)) {
        return res.status(402).json({message: 'Forbidden you dont have access to that resource'})
      } 
      next()
    }
}

function authenticateUser(req, res, next) {
    const rawToken = req.headers.authorization
    const onlyToken = rawToken.split(' ')[1]
    const token = onlyToken.substring(1, onlyToken.length - 1);
    if(token == null) return res.sendStatus(403)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {
    checkRole,
    authenticateUser
}