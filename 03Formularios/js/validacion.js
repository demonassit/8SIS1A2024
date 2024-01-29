/**
 * JS es un lenguaje interpretado, para lo cual debemos entender que el manejo de variables es no tipado
 * 
 * JS maneja var para cadenas, enteros, dobles, flotante, etc
 * 
 * JS es un lenguaje bajo multiparadigma
 */



function validar(formulario){
    if(formulario.nombre.value.length < 3){
        alert("Escriba por lo menos mas de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
    }

    var checkOK = "qwertyuiopasdfghjklzxcvbnmñ"+"QWERTYUIOPASDFGHJKLÑZXCVBNM";

    var checkString = formulario.nombre.value;

    alert(checkString);

    var todoesvalido = true;

    for(var i = 0; i < checkString.length; i++){
        var ch = checkString.charAt(i);
        for(var j = 0; j < checkOK.length; j++){
            if(ch == checkOK.charAt(j)){
                break;
            }
        }
        if(j == checkOK.length){
            todoesvalido = false;
            break;
        }
    }
    if(!todoesvalido){
        alert("Favor de escribir unicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    var checkOK = "1234567890";

    var checkString = formulario.edad.value;

    alert(checkString);

    var todoesvalido = true;

    for(var i = 0; i < checkString.length; i++){
        var ch = checkString.charAt(i);
        for(var j = 0; j < checkOK.length; j++){
            if(ch == checkOK.charAt(j)){
                break;
            }
        }
        if(j == checkOK.length){
            todoesvalido = false;
            break;
        }
    }
    if(!todoesvalido){
        alert("Favor de escribir unicamente numeros en el campo edad");
        formulario.edad.focus();
        return false;
    }

    var txt = formulario.email.value;

    var expreg = /\S+@\S+\.\S+/;

    var expreg2 = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    var expreg3 = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    alert("El correo " + (expreg.test(txt)? " " : " no " ) + " es valido");
    return expreg.test;

}