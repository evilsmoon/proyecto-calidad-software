const { Router } = require('express');
// const { check } = require('express-validator');
const {
    createUser,
    loginUser,
    renewToken,
    getUser,
    updateUser,
    updatePassword
} = require('../controllers/user.controller');
// const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Registrar 
router.post('/register', createUser);
// [
//     check('name', 'El nombre no puede estar vacio').not().isEmpty(),
//     check('image','Debe ingresar una imagen').not().isEmpty(),
//     check('phone','El telefono es obligatorio').not().isEmpty(),
//     check('ci','El número de cédula es obligatorio').isLength({ min:10, max:10 }),
//     check('email','El email es obligatorio').isEmail(),
//     check('password','El password es obligatorio').isLength({ min:6 }),
//     validarCampos
// ],


//login
router.post('/', loginUser);
// [
//     check('email','El email es obligatorio').isEmail(),
//     check('password','El password es obligatorio').isLength({ min:6 }),
//     validarCampos
// ],


// TOKEN 
router.get('/renew',[
    validarJWT
], renewToken);

//usuario
router.get('/:id', getUser);

//actualizar datos
router.put('/:id', updateUser);
// [
//     check('name', 'El nombre no puede estar vacio').not().isEmpty(),
//     check('phone','El telefono es obligatorio').not().isEmpty(),
//     check('email','El email es obligatorio').isEmail(),
//     validarCampos
// ],


//actualizar contraseña
router.put('/contra/:id', updatePassword);
// [
//     check('password','El password no cumple con la seguridad requerida').isLength({ min:6 }),
//     validarCampos
// ],



module.exports = router;