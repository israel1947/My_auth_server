const { response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT= (req, resp = response, next)=>{

    const token = req.header('x-api-key');
    
    if(!token){
        return resp.status(401).json({
            ok:false,
            msg:'Error en el token'
        });
    }

    try {
       const {uid,name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
       req.uid = uid;
       req.name = name;
       //¡console.log(uid, name);
    } catch (error) {
        return resp.status(401).json({
            ok:false,
            msg:'Token invalido'
      });
    }

    //Todo OK
    next();
}




module.exports ={
    validarJWT
}