/*
como habiamos dicho en js es un lenguaje de programacion multiparadigma por lo tanto es posible manejar POO


class FiguraGeometrica{
    //constructor
    constructor(){
        //puede o no tener alguna implementacion
    }

    //metodos
    area(){
        //metodo que se encarga de calcular el area

    }

    perimetro(){
        //metodo para calcular el perimetro
    }
}

class Rectangulo extends FiguraGeometrica{
    //constructor
    constructor(base, altura){
        super();
        this._base = base;
        this._altura = altura;
        this._area = null;
        this._perimetro = null;
        this._actualizarArea = false;
        this._actualizarPerimetro = false;
    }

    set altura(altura){
        this._altura = altura;
        //si cambia el valor del area o perimetro se debe de actualizar el dato
        this._actualizarArea = true;
        this._actualizarPerimetro = true;
    }

    set base(base){
        this._base = base;
        //si cambia el valor del area o perimetro se debe de actualizar el dato
        this._actualizarArea = true;
        this._actualizarPerimetro = true;
    }

    get area(){
        if(this._actualizarArea || this._area){
            this._area = this.calcularArea();
        }
        return this._area;
    }

    get perimetro(){
        if(this._actualizarPerimetro || this._perimetro){
            this._perimetro = this.calcularPerimetro();
        }
        return this._perimetro;
    }

    calcularArea(){
        console.log(this._base);
        console.log(this._altura);
        return this._base * this._altura;
    }    

    calcularPerimetro(){
        console.log(this._base);
        console.log(this._altura);
        return (this._base + this._altura)*2;
    }
}


const objetoRectangulo = new Rectangulo(2,5);

console.log(objetoRectangulo.calcularArea());
console.log(objetoRectangulo.calcularPerimetro());

*
//Spread
/*
Es una sintaxis que nos permite a un elemento iterable (arreglo, matriz, vector, cadena), poder desde 0 contar los argumentos que pasar por dicho elemento
*/

//tenemos el siguiente arreglo
const arregloMayorMenor = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

console.log(`Arreglo ordenado: ${arregloMayorMenor}`);

//vamos a suponer que podemos obtener tantas variables del arreglo como deseemos 

const[valorMasGrande] = arregloMayorMenor;
console.log(`Valor mas grande: ${valorMasGrande}` );

//como vamos a obtener el resto de los valores sin utilizar for o while

const[valorMasGrande1, valorMasGrande2, valorMasGrande3, ...restoValores] = arregloMayorMenor;

console.log(`VG1, VG2, VG3, ...Resto : ${valorMasGrande1}, ${valorMasGrande2}, ${valorMasGrande3}, ${restoValores}`);


//vamos a realizar una busqueda simplificada que se ocupa bastante para suplir jquerry y utilizar los elementos de js como busquedas

const redultadoDeBusqueda = {
    resultado: [
        "resultado1",
        "resultado2",
        "resultado3",
        "resultado4",
        "resultado5",
        "resultado6",
        "resultado7"
    ],
    total : 7,
    mejorCoincidencia : "resultado3"
};

console.log(`Resultado de la busqueda : ${redultadoDeBusqueda}`);

//vamos a suponer que solo nos interesa imprimir las mejores coincidencias de la busqueda

const {mejorCoincidencia} = redultadoDeBusqueda;

console.log(`Mejor coincidencia: ${mejorCoincidencia} `);

//vamos a suponer que remos cambiar el nombre, derivado a que necesitamos mantener la persistencia del codigo

const copiaResultadoDeBusqueda = {...redultadoDeBusqueda};

console.log(`Copia del resultado de busqueda: ${copiaResultadoDeBusqueda}`);