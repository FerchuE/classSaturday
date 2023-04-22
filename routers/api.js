const express = require("express")
const router = express.Router()
const apiController = require("../controllers/apiController") 
// un metodo http - una exprecion - middleware - callback
const { validarID } = require("../middleware/validarID")
const {check} = require("express-validator")

router.get("/ver",apiController.verSeleccion)
router.get("/ver/:id",validarID,apiController.buscarPorIdLaSeleccion)
router.get("/buscar/:pais",apiController.busquedaSeleccion)
router.post("/crear",[
    check("nombre").not().isEmpty().withMessage("El campo nombre es obligatorio").isLength({max:15}),
    check("pais").not().isEmpty().withMessage("El campo pais es obligatorio"),
    check("clasifico").not().isEmpty().withMessage("El campo clasifico es obligatorio"),
    check("copas").not().isEmpty().withMessage("El campo copas es obligatorio")
],apiController.guardarSeleccion)
router.put("/editar/:id",validarID[
    check("nombre").not().isEmpty().withMessage("El campo nombre es obligatorio para editar").isLength({max:15}),
    check("pais").not().isEmpty().withMessage("El campo pais es obligatorio para editar"),
    check("clasifico").not().isEmpty().withMessage("El campo clasifico es obligatorio para editar"),
    check("copas").not().isEmpty().withMessage("El campo copas es obligatorio para editar")
], apiController.editarLaSeleccion)
router.delete("/eliminar/:id",validarID, apiController.eliminarSeleccion)

module.exports = router