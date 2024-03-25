var express = require('express');

//hacemos una referencia al constructor de objetos para la instancia del servidor

var app = express();

//vamos a crear rutas mediante las cuales vamos a manejar las diferentes peticiones, derivado a que express unicamente es un servidor de escucha tenemos que definir las rutas post get put delete pach etc

app.get('/', function(req, res){

    //envie un mensaje de texto
    res.send('Ruta INICIO');    
});
//creamos el servidor 
app.listen(3000, function(req, res){
    console.log('Servidor inicializado');
});