//este va a consumir los elementos del back

const url="http://localhost:3000/8SIS1A2024/13APIBack/Back/articulos";

//debo de obtener los contenedores

const contenedor = document.querySelector('tbody');

let resultados = '';

//para obtener cada uno de los datos

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));

const formArticulo = document.querySelector('form');

const nombre = document.getElementById('nombre');

const precio = document.getElementById('precio');

const stock = document.getElementById('sotck');

let opcion = '';

//vamos hacer un crud

btnCrear.addEventListener('click', ()=> {
    //primero tenemos que vaciar los campos
    nombre.value = '';
    precio.valu = '';
    stock.value = '';

    //debo poder ejecutar el modal
    modalArticulo.show();

    //vamos a mandar las opciones del boton
    opcion = 'crear';
});

//debo crear una funcion que se encargue de poder mostrar todos los articulos de la bd

const mostrar = (articulos) =>{
    //primero iteramos todos los articulos
    articulos.forEach(articulo => {
        resultado += `
        <tr>
            <td>${articulo.id}</td>
            <td>${articulo.nombre}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.stock}</td>
            <td class="text-center" > <a class="btnEditar btn btn-primary"  > Editar </a> </td>
        </tr>`
    });
    //los muestro en el contenedor
    contenedor.innerHTML = resultados;

    //necesito consumirlo
    fetch(url)
        .then(response => response.json())
        .then(data => mostrar(data))
        .catch(error => console.log(error));
}

//en los comportamientos de los botones

const on = (element, event, selector, handler)=>{
    console.log(element);
    console.log(event);
    console.log(selector);
    console.log(handler);
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e);
        }
    });

    //cuando quiera borrar
    on(document, 'click', 'btnBorrar', e =>{
        const fila = e.target.parentNode.parentNode;
        const id = fila.firstElementChild.innerHTML;
        alertify.confirm("Este es un dialogo de confirmacion", function(){
            //este debe de mandar a llamar la operacion del back para borrar
            fetch(url+id, {
                method : 'DELETE'
            })
            .then(res => res.json())
            .then( () => location.reaload() );
        }),
        function(){
            alertify.error('Cancel');
        }
    });

    //cuando quiera editar

    let idFrom = 0;
    on(document, 'click', 'btnEditar', e => {
        const fila = e.target.parentNode.parentNode;
        idFrom = fila.children[0].innerHTML;
        const nombreFrom = fila.children[1].innerHTML;
        const precioFrom = fila.children[2].innerHTML;
        const stockFrom = fila.children[3].innerHTML;
        //obtengo los valores
        nombre.value = nombreFrom;
        precio.value = precioFrom;
        stock.value = stockFrom;
        opcion = 'editar';
        modalArticulo();

    });

    //crear y editar
    formArticulo.addEventListener('submit', (e)=>{
        e.preventDefault();
        if(opcion == 'crear'){
            //aqui debe de ser post
            fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    nombre : nombre.value,
                    precio : precio.value,
                    stock : stock.value
                }) 
            })
            .then(response => response.json())
            .then(data => {
                const nuevoArticulo = [];
                nuevoArticulo.push(data);
                mostrar(nuevoArticulo);
            });
        }
        if(opcion == 'editar'){
            fetch(url, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    nombre : nombre.value,
                    precio : precio.value,
                    stock : stock.value
                })
            })
            .then(response => response.json())
            .then(response => location.reaload());
        }
        modalArticulo.hide();
    })
}