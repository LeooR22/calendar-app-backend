/*
Rutas de events
host + /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEventos,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");

const router = Router();

//Todas tiene que pasar por la validacion del JWT
router.use(validarJWT);

//Obtener eventos
router.get("/", getEventos);

//Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El title es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),

    validarCampos,
  ],
  crearEventos
);

//Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El title es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),

    validarCampos,
  ],
  actualizarEvento
);

//Borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
