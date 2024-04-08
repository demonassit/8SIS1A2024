const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

//vamos a crear una clave secreta la cual la vamos a guardar en un archivo llamado keys.ks
const keys = require('./settings/keys');
//hacemos una llamada para enviar la referencia de las llaves
app.set('key', keys.key);

//especificamos el tipo de codificacion
app.use(express.urlencoded({extended:false}));

app.use(express.json());

//ejemplo de ruta
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(3000, () =>{
    console.log('Servidor inicializado en el puerto 3000');
});

//vamos a simular que tenemos una pagina para hacer un login

app.post('/login', (req, res) => {
    //por el tiempo no vamos a usar bd, pero vamos hacer una prueba unitaria
    if(req.body.usuario === 'admin' && req.body.pass === '12345'){
        const payload = {
            check : true
        };
        //tenemos que cargar el token y el tiempo de vida de la sesion
        const token = jwt.sign(payload, app.get('key'), {
            expiresIn : '7d'
        });
        //ahora si todo es correcto enviamos un mensaje de todo esta bien
        res.json({
            message : 'Autenticacion Exitosa',
            token : token
        });
    }else{
        res.json({
            message : 'User o Pass Incorrectos'
        });
    }
});

//para poder ocultar la clave y que no sea visible necesitamos protegerla mediante el uso de un middleware

const verificacion = express.Router();

verificacion.use((req, res, next) => {
    //primero tenemos que hacer una verificacion de acceso y autorizacion
    let token = req.headers['x-access-token'] || req.headers['Authorization'];
    console.log(token);
    //ya que sabemos que trae el token definimos las rutas y los elementos de verificacion
    if(!token){
        res.status(401).send({
            error : 'Es necesario un token para su autenticación'
        });
        return
    }
    if(token.startsWith('Bearer ')){
        //primero tenemos que quitar la variable de la cadena
        token = token.slice(7, token.length);
        //console.log(token);
    }
    //el token es valido
    if(token){
        jwt.verify(token, app.get('key'), (error, decoded)=>{
            if(error){
                return res.json({
                    message : 'Token no valido'
                });
            }else{
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        })
    }
});

//ya para poder ver en postman debo de meter el tipo de token en este caso bearer y debeomos devolver la peticion 

app.get('/info', verificacion, (req, res)=>{
    //cuando lo verifiquemos nos debe decir
    res.json('Informacion entregada');
})

