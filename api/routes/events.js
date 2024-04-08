/**
 * Rutas de eventos
 * host + /api/events
 */
const {Router} = require('express');
const { check} = require('express-validator');
const router = Router();
const {validatJWT} = require('../middlewares/validar-jwt')
const  {getEventos,crearEventos,actualizarEventos,eliminarEventos}  =require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


//Todas tienen que pasar por la validacion 

router.use(validatJWT);


//Obtener eventos
router.get('/',getEventos)


//Crear eventos
router.post('/',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion obligatoria').custom(isDate),
    validarCampos
],
crearEventos)


//Actualizar eventos
router.put('/:id',actualizarEventos)

//Eliminar eventos
router.delete('/:id',eliminarEventos)

module.exports = router;