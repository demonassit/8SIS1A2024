//este es el archivo que se va a consumir para el front

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//todo lo vamos a manejar como json
const {json} = require('express');

const app = express();

app.use(express.json());

//establecemos el middleware
app.use(cors());

//establecemos la conexion
const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'n0m3l0',
    database : 'articulos'
});

//establezco la conexion 
conexion.connect(function(error){
    if(error){
        throw error;
        console.log('Error al conectar la bd');
    }else{
        console.log('Conexion exitosa');
    }
});

//tenemos que establecer rutas y comportamientos para poder visualizar la informacion

app.get('/', function(req, res){
    res.send('Ruta Inicio');
});

//para consultar los datos de la bd
app.get('/13APIBack/Back/articulos', (req, res) => {
    conexion.query('select * from articulos ', (error, filas)=>{
        if(error){
            throw error;
            console.log('Error al conectar la tabla');
        }else{
            console.log('conecto con la tabla');
            res.send(filas);
        }
    })
});