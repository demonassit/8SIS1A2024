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

//vamos hacer una funcion para agregar la ultima direccion del movimiento
function agregarUltimoMovimiento(direccion){
    movimientos.push(direccion);
}

//necesitamos una funcion que se encargue de saber si gane
function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){
        for(var j = 0; j < rompe[i].length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//funcion para decir que gane
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Wiiii a mimir");
    }
    return false;
}

/*
Debo integrar una funcion que sirva para poder intercambiar las posiciones de la pieza
entendiendo que tengo lo siguiente:
arreglo[1][2] = arreglo[0][0]
arreglo[0][0] = arreglo[1][2]
*/

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];

    //intercambio
    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//tenemos que checar si la posicion dentro del compecabezas es la correcta
function posicionValida(fila, columna){
    return(fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//ahora viene la parte del movimiento de las piezas, derivado a que tenemos que simular que se mueve o intercambia la posicion de cada pieza respecto de la pieza vacia, eso se debe de representar con el movimiento de las flechas de navegacion identificando que las teclas son: arriba(38), abajo(40), izquierda(37), derecha(39)

var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    //si se mueve hacia abajo
    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }
    //si se mueve hacia arriba
    if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }
    //si se mueve hacia derecha
    if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    }
    //si se mueve hacia izquierda
    if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    //checar si la nueva posicion es valida y sino intercambiarla
    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        //agregar cual fue el ultimo movimiento
        agregarUltimoMovimiento(direccion);
    }

}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
    //intercambio las posiciones de la pieza
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    //para hacerlo visible en el html
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2){
    //necesito obtener los valores de las piezas del html
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);

    var padre = elementoPieza1.parentNode;

    //clonar el elemento
    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.removeChild(clonElemento2, elementoPieza1);
}

//actualizar los movimientos

function actualizarUltimoMovimiento(direccion){
    var ultimoMov = document.getElementById('flecha');
    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;    
    }
}

//mezclar las piezas

function mezclarPiezas(veces){
    if(veces <= 0){
        return;
    }

    var direcciones = [codigosDireccion.ABAJO,codigosDireccion.ARRIBA, codigosDireccion.IZQUIERDA, codigosDireccion.DERECHA];

    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];

    moverEnDireccion(direccion);
    setTimeout(function() {
        mezclarPiezas(veces -1);
    }, 100);
}

//saber que teclas esta oprimiendo el jugar

function capturarTeclas(){
    //necesitamos saber que tecla se esta movimiento
    document.body.onkeydown = (function(evento){
        if(evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.IZQUIERDA || evento.which === codigosDireccion.DERECHA){
            moverEnDireccion(evento.which);
            actualizarUltimoMovimiento(evento.which);

            var gane = checarSiGano;
            if(gane){
                setTimeout(function(){
                    mostrarCartelGanador();
                }, 500);
            }
            evento.preventDefault;
        }
    })
}

//iniciar el juego
function iniciar(){
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();
//llamar las instrucciones del juego
mostrarInstrucciones(instrucciones);