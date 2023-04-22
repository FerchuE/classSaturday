const mongoose = require("mongoose")
require("dotenv").config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT)
        console.log("¡Ahora se conecto la base de datos sin errores crack!")
    } catch {
        console.log("¡ups! No se logro conectar a la base de datos")
    }
}

module.exports = {connect}