/* CLASE 32 1:45 */
import axios from "axios"

const conseguirToken = async() =>{
    try {
        const token = await axios.post("url de postman",{
            email,
            password
        })
        return token
    } catch (error) {
        console.log(error)
    }

}

const getItems = async (token) => {
    try {
        const items = await axios.get("url de postman",{
            headers:{
                'x-token': token 
            }
        }) 
        return items
    } catch (error) {
        console.log(error)
    }
}

const createItem = async (token, body)=>{
    try {
        const createItem = await axios.post("",{
            nombre: body.nombre,
            pais: body.pais,
            copas: body.copas,
            clasifico: body.clasifico
        },{
            headers:{
                'x-token': token
            }
        })
    } catch (error) {
        console.log(error)
    }
}