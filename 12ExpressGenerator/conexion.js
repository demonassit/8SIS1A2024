var mysql = require('mysql');

var conexion = mysql.createConexion({
    //debo de establacer los parametro de conexion
    host : 'localhost',
    database : 'alumnos',
    user : 'root',
    password : 'n0m3l0'
});

//ejecuto la conexion
conexion.connect(function(error){
    //si no conecta
    if(error){
        throw error;
        console.log('Error al conectar la BD');
    }else{
        console.log('Conexion exitosa');
    }
});

//hagamos una consulta

conexion.query('select * from alumnos', function(error, respuesta){
    if(error){
        throw error;
        console.log('Error en la consulta alumno');
    }else{
        respuesta.forEach(respuesta => {
            console.log(respuesta);
        });
    }
});

conexion.query('insert into alumnos (nombre, appat, apmat, correo, password) values ("Kevin", "Del castillon", "Rio", "Kevin@funa.funa", "Kevin")', function(error, respuesta){
    if(error){
        throw error;
        console.log('Error al insertar alumno');
    }else{
       
            console.log(respuesta);
        
    }
})