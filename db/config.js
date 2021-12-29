const  mongoose  = require('mongoose');


const dbConection = async()=>{
    try {
        mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopoLogy: true,
            //useCreateIndex: true
        });
        console.log('base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar DB');//Evita levantar la db en caso de error en la App
    }
}

module.exports = {
    dbConection
}