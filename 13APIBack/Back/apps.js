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

//ruta post es para insertar
app.post('/13APIBack/Back/articulos', (req, res) =>{
    //vamos a insertar en la bd
    let data = {
        descripcion : req.body.descripcion,
        precio : req.body.precio,
        stock : req.body.stock
    };

    //vamos con la sentencia
    let sql = "insert into articulos SET ?";
    conexion.query(sql, data, function(error, result){
        if(error){
            throw error;
            console.log('Error al insertar un registro de la tabla');
        }else{
            //primero necesitamos un objeto para asignar el id
            Object.assign(data, {id : result.insertId});
            //como ya en data se agrega el id
            res.send(data);
        }
    });

})

//ruta put es para editar
app.put('/13APIBack/Back/articulos', (req, res) => {
    //primero necesitamos las variables que vamos a editar
    let id = req.params.id;
    let descripcion = req.params.descripcion;
    let precio = req.params.precio;
    let stock = req.params.stock;

    let sql = "update articulos set descripcion = ?, precio = ?, stock = ? where id = ?";

    conexion.query(sql, [descripcion, precio, stock, id], function(error, result){
        if(error){
            throw error;
            console.log('Error al actualizar un registro de la tabla');
        }else{
            console.log('conecto con la tabla');
            res.send(result);
        }
    });
});


//ruta delete 
app.delete('/13APIBack/Back/articulos', (req, res) => {
    conexion.query('delete from articulos where id = ?', [req.params.id], function(error, result){
        if(error){
            throw error;
            console.log('Error al eleiminar un registro de la tabla');
        }else{
            console.log('conecto con la tabla');
            res.send(result);
        }
    });
});


