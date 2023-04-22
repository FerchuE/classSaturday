const {NationalTeams} = require("../models/seleccion")
const validarID = async (req, res, next) => {
    try{
        const team = await NationalTeams.findById(req.params.id)
        if (team !== null) {
            next() // next: es un callback, sigue la 
        } else {
            res.status(500).json({msg: "el id es inservible"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { validarID }