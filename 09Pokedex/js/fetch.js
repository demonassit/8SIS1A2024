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

    //vamos a obtener las estadisticas del pokemon
    const processPokemonStats = (pokemonData) => {
        //lo que vamos hacer es una funcion que se encargue de ir iterando sobre cada
        //uno de los datos que existen en la api, para ello ocupamos un forEach, pero
        //vamos a preguntar dentro de la iteracion si es del pokemon que estamos buscando
        pokemonData?.forEach((pokemonStatData) => {
            //aqui tenemos que evaluar si es el nombre del pokemon obtener sus valores 
            //pero los tenemos que incorporar en su contenedor y agregar los elementos
            switch(pokemonStatData.stat.name){
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "special-attack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "special-defense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
            }
        });
    };
    //debo crear otra funcion que se encargue de obtener los movimientos y colocarlos
    //en su contenedor
    const processPokemonMoves = (pokemonData) => {
        let pokemonMovesContent = "";
        pokemonData.moves?forEach((pokemonMove) => {
            pokemonMovesContent += `<li>${pokemonMove.move.name}</li>`;
        });
        containers.pokemonMovesElement.innerHTML = pokemonMovesContent;
    };
    //debo crear otra funcion que se encargue de obtener las habilidades y colocarlos
    //en su contenedor
    const processPokemonAbilities = (pokemonData) => {
        let pokemonAbilitiesContent = "";
        pokemonData.abilities?forEach((pokemonAbility) => {
            pokemonAbilitiesContent += `<li>${pokemonAbility.ability.name}</li>`;
        });
        containers.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
    };
    //tengo que crear una funcion para la carga de la imagen y deshabilitar los botones
    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplete.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disabled = true);
    };
    //necesito otra funcion que se encargue de volver habilitar
    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    };
    /*
    Tenemos que crear una funcion mediante la cual podamos realizar una peticion y mientras esta obteniendo la informacion por partes esperemos su respuesta, para eso nos sirve una funcion fetch, ya que esta funcion tiene la facultad de poder cargar archivos de forma local, fetch recibe una url del recurso o destino de la peticion y establece un objeto que nos ayuda a obtener algunos parametros.
    fetch devuelve una promesa, las promesas como su nombre lo dicen son funciones mediante las cuales nosotros hacemos una peticion, entonces debemos esperar un tiempo x para la respuesta, significa que la peticion se sigue procesando en un tiempo desconocido pero se asegura que va a existir una respuesta es por eso que fetch tiene un then y un catch, entonces nosotros debemos crear una funcion mediante un objeto de json podamos obtener toda la informacion que tenemos en las funciones anteriores y puede ser que lo primero que encuentre sea las habilidades, o las estadisticas o los movimientos, no imporque obtenga primero sino que al momento de realizar la peticion tendremos una promesa de una respuesta
    */
   const getPokemonData = async (pokemonName) => fetch(`${pokeApiUrl}pokemon/${pokemonName}`, {
    //existen varios metodos de http que sirven para poder realizar peticiones, como este el caso tenemos que empezar a especificar el tipo de metodo mediante el cual nosotros haremos la peticion 
    method : 'GET', //tambien podemos usar POST, PUT, DELETE, PACH, ETC
    //debo de establecer la cabecera del la peticion, debido a que tenemos que especificar el tipo de informacion que vamos a colocar
    headers : {
        'Content-Type' : 'application/json'
    }, 
    //debemos de especificar el cuerpo de la solicitud o peticion, por ejemplo si nosotros tenemos que incorporar algun elemento puede ser : body : JSON.stringify(myObjetoJson) esto es cuando sea una peticion POST o PUT, para el GET no es necesario derivado a que nosotros solo estamos consumiendo informacion, mientras que POST o PUT realizar una actualizacion a la peticion ingresando o modificando los datos del JSON original 
   }).then((res) => res.json()).catch((error) => ({resquestFailed : true}));

   //tenemos que ver si se debe de deshabilitar los botones o no, en caso unicamente de que se necesite deshabilitar el boton inferior ya que no existen pokemones negativos con id
   const checkDisabled = (button) =>{
    button.disabled = button.id === "btnDown" && containers.pokemonIdElement.value <= 1;
   }
   //vamos hacer la funcion cuya promesa es obtener todos los datos del pokemon
   const setPokemonData = async (pokemonName) => {
    if(pokemonName){
        //primero ponemos la imagen de la busqueda y deshabilitamos los botones para la consulta
        setLoading();
        //realizo la consulta, en este caso con await porque debemos de esperar una respuesta en un tiempo asincrono 
        const pokemonData = await getPokemonData(typeof pokemonName === typeof "" ? pokemonName.toLowerCase() : pokemonName);
        if(pokemonData.resquestFailed){
            //si no se encontro el pokemon debemos colocar la imagen de no encontrado
            containers.imageContainer.innerHTML = imageTemplete.replace("{imgSrc}", images.imgPokemonNoFound);
        }else{
            //al encontrarlo debemos de colocar la imagen y el id del pokemon
            containers.imageContainer.innerHTML = `${imageTemplete.replace("{imgSrc}". pokemonData.sprites.front_default)} ${imageTemplete.replace("{imgSrc}". pokemonData.sprites.front_shiny)}`;
            //ahora van los datos nombre id tipo estadisticas movimientos y habilidades
            containers.pokemonNameElement.innerHTML = pokemonData.name;
            containers.pokemonIdElement.innerHTML = pokemonData.id;
            //mando a llamar cada una de mis funciones
            processPokemonTypes(pokemonData);
            processPokemonStats(pokemonData);
            processPokemonMoves(pokemonData);
            processPokemonAbilities(pokemonData);
        }
        //vuelvo habilitar los botones
        setLoadingComplete();
    }else{
        //tenemos que utilizar una alerta o una notificacion de error y podemos utilizar SweetAlert porque se ven bonitas 
        Swal.fire({
            title: "Error",
            text: "Ingresa el nombre de un pokemon primero",
            icon: "error",
            confirmButtonText : "Aceptar"
          });
    }
   };

   //tenemos que vincular una funcion de busqueda al boton buscar
   const triggers = () => {
    buttons.search.onclick = () => setPokemonData(pokemonInput.value);
    //se le vincula la funcion de busqueda al campo de texto para buscar precionando enter
    pokemonInput.onkeyup = (event) => {
        event.preventDefault();
        if(event.key === "Enter"){
            setPokemonData(pokemonInput.value);
        }
    }
    //tenemos que vincular las funciones de busqueda para cuando sea arriba o abajo 
    buttons.next.onclick = () => setPokemonData(+containers.pokemonIdElement.value + 1);
    buttons.previous.onclick = () => setPokemonData(+containers.pokemonIdElement.value - 1);
   };
   setLoadingComplete();
   triggers();
};

//ejecutarlo
window.onload = pokedex;