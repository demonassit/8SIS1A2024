

//vamos a crear nuestro servidor

var http = require('http');

var servidor = http.createServer(function(request, response){
    //vamos a definir los tipos de respuesta que debe de tener el servidor
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write('<h2>Hola mundo este es un server bonito y kawaii</h2>');
    responde.end();
});

//mandamos a llamar al servidor en el puerto
servidor.listen(3000);

//para ejecutar las peticiones
console.log('Ejecutando en el servidor 3000');