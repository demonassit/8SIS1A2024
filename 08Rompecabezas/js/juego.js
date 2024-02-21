//vamos a crear un arreglo que contenga todas las instrucciones del juego

var instrucciones = ["Hola bienvenido al rompecabezas kawaii, por favor utiliza las flechas de navegacion para poder mover las piezas", "Ordena las piezas hasta alcanzar la imagen objetivo dentro de la pantalla"];

//vamos a crear una variable para guardar los movientos

var movimientos = [];

//vamos a crear una matriz que represente las posiciones del rompecabezas resuelto de forma correcta y otra matriz con la base original

var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//necesito una varible para saber en que posicion se encuentra la pieza vacia
var filaVacia = 2;
var columnaVacia = 2;

//necesito una funcion para recorrer el arreglo pasando por cada elemento

//para las instrucciones
function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstrucciones(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionEnLista(instruccion, idLista){
    var ul = document.getElementById("idLista");
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}
