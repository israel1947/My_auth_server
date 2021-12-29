
const{response} = require('express');
const Usuario   = require('../models/Usuario');
const bcrypt    = require('bcryptjs');
const { generarJWT } = require('../helpers/JWT');

//crear nuevo usuario
const crearUsuario = async (req, resp = response)=>{
    const {email,name,password} = req.body

    try {
    //verificar que no existan correos iguales
    const usuario = await Usuario.findOne({email});
    if(usuario){
        return resp.status(400).json({
            ok:false,
            msg:'El usuario ya ha sido registrado, por favor intente con otro'
        });
    }
    //crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    //hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    //generar el JsonWebToken
    const token = await generarJWT(dbUser.id, name);

    //crear usuario de DB
    await dbUser.save();

    //generar respuesta exitosa
    return resp.status(201).json({
        ok:true,
        uid:dbUser.id,
        name,
        email,
        token
    });
   // console.log(email,name,password);
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg:'Algo ha ido mal, pongase en contacto con el administrador'
      });
    }
}

//login de usuario
const loginUsuario = async (req, resp)=>{
    //dejar pasar al usuario si todo ha ido bien en la validacion
    const {email,password} = req.body

    try {
        //verificar que exista el usuario correos
        const dbUser = await Usuario.findOne({email});
        if(!dbUser){
            return resp.status(400).json({
                ok:false,
                msg:'Credenciales incorrectas'
            });
        }

        //confirmar si el password hace match(si existe en la db)
        const validPassword = bcrypt.compareSync(password,dbUser.password );
        if(!validPassword){
            return resp.status(400).json({
                ok:false,
                msg:'Credenciales incorrectas'
            });
        }

        //generar el JsonWebToken(JWT)
        const token = await generarJWT(dbUser.id, dbUser.name, dbUser.email);

        //espuesta del servici
        return resp.json({
            ok:true,
            uid:dbUser.id,
            name:dbUser.name,
            token,
            email:dbUser.email,
            msg:'Login exitoso'
        });

    } catch (error) {
        //console.log(error);
        //console.log(email,password);
        return resp.status(500).json({
            ok:false,
            msg:'Error en inicio de sesión, hable con el admin'
        });
    }
}

//validar y/o revalidar el Json Web Token(JWT)
const validadorToken = async (req, resp = response)=>{
    const {uid} = req;

    //leer base de datos
    const dbUser = await Usuario.findById(uid);

    //generar el JsonWebToken(JWT)
    const token = await generarJWT(uid,dbUser.name);

    //respuesta del servicio
    return resp.json({
        ok:true,
        uid,
        name:dbUser.name,
        email:dbUser.email,
        token,
        msg:'Validacion y/o revalidacion de Token exitosa',
        
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    validadorToken
}