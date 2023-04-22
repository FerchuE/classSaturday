const { User } = require("../models/user")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const generatorToken = require('../helpers/generadorJWT')
module.exports =  {
    indexUser (req, res) {
        res.send('Hello User')
    },
    infoUser(req, res) {
        res.json({
            name: "Ferchu"
        })
    },
    session(req, res){
        let usuario = {
            id: "23332",
            name: "Jimenez",
            role:"USUARIO",
            idioma: "Español"
        }
        res.cookie("cookieDelUsuario",usuario.idioma,{ maxAge: 60000 })
        console.log(req.cookies.cookieDelUsuario)
        req.session.user = usuario;
        res.json(req.session.user)
    },
    consultar(req, res){
        res.json(req.session)
    },
    cerrarSession(req, res){
        req.session.destroy()
        res.clearCookie("cookieDelUsuario")
        res.json({
            msg: "closed session"
        })
    },
    async login (req, res){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email})
                if (usuario == null) {
                    res.json({msg: "the password or the email are incorrects"}) 
                }
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.json({msg: "the password or the email are incorrects"})
                }
                const user = {
                    _id: usuario._id,
                    name: usuario.name
                }
                req.session.user = user

                if (req.body.remermber) {
                    res.cookie("sessionDelUsuario",req.session.user,{maxAge: 120000})
                }
                res.json({msg: "usuario logeado"})
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(err)
        }
        /* let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync("helloworld", salt) */
    },
    logout(req, res){
        res.clearCookie("sessionDelUsuario")
        req.session.destroy()
        res.json({msg: "session closed"})
    },
    async loginConToken(req, res){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email})
                if (usuario == null) {
                    return res.json({msg: "the password or the email are incorrects"}) 
                }
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    return res.json({msg: "the password or the email are incorrects"})
                }

                const token = await generatorToken({id:usuario._id, email:usuario.email})
                console.log ('usuario logeado ' + usuario._id)
                res.json({msg: "usuario logeado", token})
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(err)
        }
    },
    validar(req, res){
        res.send("token correcto")
    }
}

    /* FerDecidido (req, res) {
        res.send('Le doy gracias a la Ailin por ser parte de mi vida.')
    },
    FerProgramador (req, res) {
        res.json({
            description: "Yo me tomo encerio el hecho de aprender programación con numen y no perder esta gran oportunidad"
        })
        res.cookie("cookieDelUsuario", usuario.idioma,{ maxAge: 60000})
        res.cookie("cookieSegunda",usuario.idioma,{ maxAge: 60000})
        console.log(req.cookies)
        req.session.user = usuario;
        res.json(req.session.user)
    },
    session(req, res){
        let usuario = {
            id: "123456asdk",
            name: "Juan"
        }
        req.session.user = usuario;
        res.json(req.session)
    },
    consultar(req, res){
        res.json(req.session)
    },
    cerrarSession(req, res){
        req.session.destroy()
        res.clearCookie("cookieDelUsuario")
        req.json({
            msg: "Se cerro la sesion"
        })
    },
    async login (req, res){
        try{
            const err = validationResult(req)
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email})
                if (usuario === null) {
                    res.json({msg: "la contraseña o el email son incorrectos"})
                }
                const user = {
                    _id: usuario._id,
                    name: usuario.name
                }
                req.session.user = user

                if (req.body.remermber)
                
            res.json({msg: "usuario logeado"})
        } else {
            res.json(err)
        }
        }  catch (error) {
            res.json(error)
            }
        },
        logout(req, res){
            res.clearCookie("sessionDelUsuario")
            req.session.destroy()
            res.json({msg: "session cerrada"})
        }
    } */

/*     async consultaAxios(req, res){
        try {
            const respuesta = await axios.get("https://pokeapi.co/api/v2pokemon?nombre")
            res.json({response: respuesta.data, status: respuesta.status})
        } catch (error) {
            res.json {response: respuesta.data, status: error.response.status}
            
        }
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
    } */

