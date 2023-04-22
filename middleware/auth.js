module.exports = {
    auth(req, res, next) {
        if (!req.session.user) {
            res.json({
                msg: "user is not loggin on"
           })
        } else {
            next()
        }
    },
    role(req, res, next){
        if (req.session.user.role === "ADMIN") {
            
        } else {
            
        }
    }
}