const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, validadorToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const router = Router();

//crear un nuevo usuario
router.post('/register',[
    check('name', 'Por favor, el nombre es obligatorio').not().isEmpty(),
    check('email','El Email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarCampos
],crearUsuario);

//Login de usuario
router.post('/',[
    check('email','El Email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarCampos
] ,loginUsuario);

//validar y revalidar el token del user
router.get('/renew',validarJWT,validadorToken);



module.exports = router;