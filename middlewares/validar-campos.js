const { response } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = (req, resp = response, next)=>{
     //mostrar error cuando el campo de email y/o contraseña no están correctos
     const  errors = validationResult(req);
     if(!errors.isEmpty() ){
         return resp.status(400).json({
             ok:false,
             errors: errors.mapped()
      });
   }
   //dejar pasar al usuario si todo ha ido bien en la validacion que se hace desde auth.js de controllers
   next();
}

//exportar el modulo parfa ser usados en otros archivos
module.exports = {
    validarCampos
}