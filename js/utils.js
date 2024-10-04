import {
    calcularEdad,
    tirandoFruta,
    comparandoDatosYTipos,
    yoObjeto,
    dobleDeElementos,
    trianguloDeAsteriscos1,
    trianguloDeAsteriscos2,
    nombresConA,
    reemplazarPalabras,
    cortarTexto,
    stringConSeparador,
    calculadoraDeRecaudacion,
    sacarMayusculasYTildes
} from "./ejercicios.js";


const LISTA_FRUTAS = ["naranja", "frutilla", "ananá", "mandarina", "banana", "manzana", "pera", "uva", "kiwi", "mango"];
const resultado = document.getElementById("resultado");


function pedirCadenaContenido(mensaje) {
    let cadena = prompt(mensaje);
    while (typeof cadena === "undefined" || cadena === "")
        cadena = prompt(mensaje + "\nERROR: El ingreso no puede ser vacío.");
    return cadena;
}
function pedirListaCadenasSeparador(mensaje, separador) {
    return pedirCadenaContenido(mensaje).split(separador);
}
function pedirPalabra(mensaje) {
    let cadena = pedirCadenaContenido(mensaje);
    while (!/^\w+$/.test(cadena))
        cadena = pedirCadenaContenido(mensaje + "\nERROR: Verifique que el ingreso sea una palabra.");
    return cadena;
}
function pedirPalabraEnCadena(mensaje, cadena) {
    let palabra = pedirPalabra(mensaje);
    while (!cadena.toLowerCase().includes(cadena.toLowerCase()))
        palabra = pedirPalabra(mensaje + "\nERROR: \"" + palabra + "\" no está en \"" + cadena + "\".");
    return palabra;
}
function pedirNumero(mensaje) {
    let cadenaNumero = pedirCadenaContenido(mensaje);
    let numero = Number(cadenaNumero);

    while (isNaN(numero)) {
        cadenaNumero = pedirCadenaContenido(mensaje + "\nERROR: Ingreso no es un número.");
        numero = Number(cadenaNumero);
    }

    return numero;
}
function pedirNumeroMayorA(mensaje, desde) {
    let numero = pedirNumero(mensaje);

    while (numero <= desde)
        numero = pedirNumero(mensaje + "\nERROR: Numero menor a " + desde + ".");

    return numero;
}
function pedirLista(mensaje, accionExtra=ingreso => ingreso, condicionExtra=ingreso => true, errorCondicionExtra="") {
    const ADVERTENCIA = "\n(no ingrese nada para terminar el ingreso)";
    let lista = [];
    let ingreso = prompt(mensaje + ADVERTENCIA);
    
    while(typeof ingreso !== "undefined" && ingreso !== "") {
        ingreso = accionExtra(ingreso);
        if (!condicionExtra(ingreso)) {
            ingreso = prompt(mensaje + ADVERTENCIA + "\nERROR: " + errorCondicionExtra);
        } else {
            lista.push(ingreso);
            ingreso = prompt(mensaje + ADVERTENCIA);
        }
    }

    return lista;
}
function pedirListaNumeros(mensaje) {
    return pedirLista(mensaje, cadenaNumero => Number(cadenaNumero), numero => !isNaN(numero), "Ingrese un número.");
}
function pedirListaRecaudaciones(mensaje) {
    const CANT_PARTES = 2;

    return pedirLista(
        mensaje,
        cadenaLista => {
            const cadenaListaSeparada = cadenaLista.split(":");
            if (cadenaListaSeparada.length === CANT_PARTES) {
                cadenaLista = {
                    nombre: cadenaListaSeparada[0],
                    total: Number(cadenaListaSeparada[1])
                };
            }
            return cadenaLista;
        },
        recaudacion => typeof recaudacion === "object" && !isNaN(recaudacion.total),
        "Asegurese que el formato sea válido."
    );
}
function pedirEntero(mensaje) {
    let numero = pedirNumero(mensaje);

    while (numero - Math.floor(numero) !== 0)
        numero = pedirNumero(mensaje + "\nERROR: Ingrese un entero.");
    
    return numero;
}
function pedirEnteroDesde(mensaje, desde) {
    let numero = pedirEntero(mensaje);

    while (numero < desde)
        numero = pedirEntero(mensaje + "\nERROR: Ingrese un entero desde " + desde + ".");
    
    return numero;
}
function pedirEnteroDesdeHasta(mensaje, desde, hasta) {
    let numero = pedirEntero(mensaje);
    
    while (numero < desde || numero > hasta)
        numero = pedirEntero(mensaje + "\nERROR: Ingrese un entero entre " + desde + "-" + hasta + ".");
    
    return numero;
}
function pedirFecha(mensaje) {
    let cadenaFecha = prompt(mensaje);
    let fecha = new Date(cadenaFecha);

    while (!(fecha instanceof Date) || isNaN(fecha)) {
        cadenaFecha = prompt(mensaje + "\nERROR: Ingrese una fecha válida.");
        fecha = new Date(cadenaFecha);
    }

    return fecha;
}
function pedirFechaPasada(mensaje) {
    let fecha;
    do {
        fecha = pedirFecha(mensaje);
    } while (Date.now() < fecha.valueOf());
    return fecha;
}

function mostrarListaProlijamente(mensajePrevio, listaCadenas) {
    let cadenaFinal = mensajePrevio;
    for (const cadena of listaCadenas) {
        cadenaFinal += "\n- " + cadena;
    }
    console.log(cadenaFinal);
}
function mostrarListaEnDOM(listaCadenas, elementoPadre) {
    const elementoLista = document.createElement("ul");
    let elementoIndividual;
    for (const cadena of listaCadenas) {
        elementoIndividual = document.createElement("li");
        elementoIndividual.innerText = cadena;
        elementoLista.appendChild(elementoIndividual);
    }
    elementoPadre.appendChild(elementoLista);
}
function mostrarEnDOM(cadena, elementoPadre) {
    const elemento = document.createElement("p");
    elemento.innerText = cadena;
    elementoPadre.appendChild(elemento);
}


// Calcular edad
const nombre = pedirCadenaContenido("Ingrese su nombre:");
const fechaNacimiento = pedirFechaPasada("Ingrese su fecha de nacimiento:");
console.log("Hola " + nombre + ", tienes " + calcularEdad(fechaNacimiento) + " años!");


// Tirando fruta
mostrarListaProlijamente("¡FRUTAS, FRUTAS! Tenemos:", LISTA_FRUTAS);
const fruta = pedirCadenaContenido("Ingrese una fruta:");
const posFruta = tirandoFruta(fruta, LISTA_FRUTAS); // DETERMINAR QUE HACER
if (posFruta !== -1)
    console.log("Sí, tenemos " + LISTA_FRUTAS[posFruta] + "!");
else
    console.log("No, no tenemos " + LISTA_FRUTAS[posFruta] + "!");


// Comparando datos y tipos
comparandoDatosYTipos();


// Yo, objeto
const ciudad = new Object();
ciudad.nombre = pedirCadenaContenido("Nombre de una ciudad:");
ciudad.fechaFundacion = pedirFecha("Fecha de fundacion de " + ciudad.nombre + ":");
ciudad.poblacion = pedirEnteroDesde("Población de " + ciudad.nombre + ":", 0);
ciudad.extension = pedirNumeroMayorA("Extensión en km^2 de " + ciudad.nombre + ":", 0);
yoObjeto(ciudad);


// Doble de elementos
let listaNumeros = pedirListaNumeros("Ingrese un número:");
mostrarListaProlijamente("Lista vieja:", listaNumeros);

listaNumeros = dobleDeElementos(listaNumeros);
mostrarListaProlijamente("Lista nueva:", listaNumeros);


// Triángulo de Asteriscos
trianguloDeAsteriscos1("*", 5);
trianguloDeAsteriscos2("*", "-", 5);


// Nombres con 'A'
const nombres = pedirListaCadenasSeparador("Ingrese nombres:", ",");
mostrarListaEnDOM(nombresConA(nombres), resultado);


// Reemplazar Palabras
let cadena = pedirCadenaContenido("Ingrese una cadena de texto:");
const aReemplazar = pedirPalabraEnCadena("Ingrese la palabra a reemplazar:", cadena);
const reemplazo = pedirPalabra("Ingrese la palabra de reemplazo:");
console.log(reemplazarPalabras(aReemplazar, reemplazo));


// Cortar texto
cadena = pedirCadenaContenido("Ingrese otra cadena de texto:");
const numCaracteres = pedirEnteroDesdeHasta("Ingrese el N° de caracteres:", 1, cadena.length);
mostrarEnDOM(cortarTexto(cadena, numCaracteres), resultado);


// String con separador
const SEPARADOR = " - ";
const listaElementos = pedirListaCadenasSeparador("Ingrese otra lista de elementos:", ",");
mostrarEnDOM(stringConSeparador(listaElementos, SEPARADOR), resultado);


// Calculadora de Recaudación
const listaRecuadaciones = pedirListaRecaudaciones("Ingrese <producto>:<total>:");
const recaudacionFinal = calculadoraDeRecaudacion(listaRecuadaciones);
mostrarEnDOM("$" + recaudacionFinal, resultado);