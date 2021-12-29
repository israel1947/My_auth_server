const jwt = require('jsonwebtoken')

const generarJWT=(uid,name)=>{
    const payLoad={uid,name};

    return new Promise((resolve,rejects)=>{
        jwt.sign(payLoad,process.env.SECRET_JWT_SEED,{
            expiresIn:'24h'
        },(err, token)=>{
            if(err){
                //cualquier error
                console.log(err);
            }else{
                //todo OK
                resolve(token);    
            }
        });
    });
}

module.exports={
    generarJWT
}
