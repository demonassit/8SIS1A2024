/*
Una Api REST nos permite obtener informacion sobre diferentes elementos al 
poder consumir datos desde una fuente externa en este caso vamos hacer uso 
de https://pokeapi.co para poder comunicar el servicio del front con un servicio
en backend, siendo que toda la bd de pokemones ya existe por lo tanto unicamente
se va a consumir
*/

const pokeApiUrl = "https://pokeapi.co/api/v2";
const pokedex = () => {
    //este es un objeto auxiliar que nos permite acceder a los campos destinados a mostrar
    //las estadisticas del pokemon que queremos buscar, esto haciendo uso 
    //de la API DOM que ya hemos visto
    const pokemonStatsElements = {
        hp : document.getElementById("pokemonStatHp"),
        attack : document.getElementById("pokemonStatAttack"),
        defense : document.getElementById("pokemonStatDefense"),
        specialAttack : document.getElementById("pokemonStatSpecialAttack"),
        specialDefense : document.getElementById("pokemonStatSpecialDefense"),
        speed : document.getElementById("pokemonStatSpeed")
    };
    //vamos a crear una variable para una referencia axuliar que nos permitira utilizar 
    //las clases que estan dentro del archivo de la css para los colores acorde al 
    //la clase pokemon
    let currentClassType = null;
    //vamos a crear una constante para obtener un templete de la imagen que queremos
    //visualizar del tipo de pokemon
    const imageTemplete = "<img class= 'pokedisplay' src='{imgSrc}' alt='pokedisplay'>";
    //Vamos a crear un objeto que se encargue de guardar las rutas de las imagenes
    //que nos serviran de apoyo para las busquedas y cuando no se encuentre el pokemon
    const images = {
        imgPokemonNoFound : "../img/404.png",
        imgLoading : "../img/loading.gif"
    };
    //necesitamos un objeto para obtener las referencias de los elementos que 
    //despliegan la informacion del pokemon
    const containers = {
        imageContainer : document.getElementById("pokedisplay-container"),
        pokemonTypesContainer : documento.getElementById("pokemonTypes"),
        pokemonNameElement : documento.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement : documento.getElementById("pokemonAbilities"),
        pokemonMovesElement : documento.getElementById("pokemonMoves"),
        pokemonIdElement : documento.getElementById("pokemonId")
    };
    //vamos a obtener todas las referencias de los botones de accion
    const buttons = {
        all : Array.from(document.getElementsByClassName("btn")),
        search : document.getElementById("btnSearch"),
        next : document.getElementById("btnUp"),
        previous : document.getElementById("btnDown")
    };
    //vamos a obtener la referencia del nombre del pokemon
    const pokemonInput = document.getElementById("pokemonName");

    //es vamos a crear una funcion que debe de ir buscando dentro de la API los datos
    //conforme al elemento de busqueda, eso quiere decir que si yo pongo
    //pikachu esta funcion debe de obtener el nombre, realizar una busqueda en BD
    //de la API, obtener la coincidencia, y de ahi ir segmentando los datos de 1 en 1

    //primero vamos hacer una funcion para obtener el tipo de pokemon con sus datos
    const processPokemonTypes = (pokemonData) => {
        let pokemonType = "";
        //primero debemos de obtener a que clase pertenece para hacer referencia a su css
        const firstClass = pokemonData.types[0].type.name;    
        //ya que obtuve el nombre y la clase debo empezar a diferenciar los elementos
        pokemonData.types.forEach((pokemonTypeData) => {
            //vamos a crear una etiqueta para saber la clase del pokemon y meterlo en un
            // arreglo
            pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;
        });
        //se debe de quitar la clase previa en el contenedor de habilidades y movimientos
        if(currentClassType){
            containers.pokemonMovesElement.classList.remove(currentClassType);
            containers.pokemonAbilitiesElement.classList.remove(currentClassType)
        }
        //debo agregar la nueva informacion de habilidades y movimientos
        containers.pokemonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);
        currentClassType = firstClass;

        //agrego las etiquetas que se crearon nuevas en el html
        containers.pokemonTypesContainer.innerHTML = pokemonType;
    };
    
}