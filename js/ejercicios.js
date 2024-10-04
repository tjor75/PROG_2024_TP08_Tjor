export function sacarMayusculasYTildes(cadena) {
    let nuevoCaracter;
    let nuevaCadena = "";
    for (let i = 0; i < cadena.length; i++) {
        nuevoCaracter = cadena[i].toLowerCase();
        switch (nuevoCaracter) {
            case "á":
                nuevoCaracter = "a";
                break;
            case "é":
                nuevoCaracter = "e";
                break;
            case "í":
                nuevoCaracter = "i";
                break;
            case "ó":
                nuevoCaracter = "o";
                break;
            case "ú":
                nuevoCaracter = "u";
                break;
        }
        nuevaCadena += nuevoCaracter;
    }
    return nuevaCadena;
}
function convertirBooleanoStringEspaniol(booleano) {
    return booleano ? "Sí" : "No";
}
function mostrarTipoDato(dato) {
    console.log("El tipo de dato de " + dato + " es: " + typeof dato);
}


export function calcularEdad(fechaNacimiento) {
    const fechaActual = new Date();
    const fechaCumpleanios = fechaNacimiento;
    const anioActual = fechaActual.getFullYear();
    const anioNacimiento = fechaNacimiento.getFullYear();
    let edad = anioActual - anioNacimiento;

    fechaCumpleanios.setFullYear(anioActual);

    if (fechaActual - fechaCumpleanios < 0)
        edad--;

    return edad;
}


export function tirandoFruta(fruta, frutas) {
    return frutas.map(cadena => sacarMayusculasYTildes(cadena)).indexOf(sacarMayusculasYTildes(fruta));
}


export function comparandoDatosYTipos() {
    console.log("¿10 == '10'?: " + convertirBooleanoStringEspaniol(10 == '10'));
    console.log("¿10 === '10'?: " + convertirBooleanoStringEspaniol(10 === '10') + "\nCompara teniendo en cuenta los dos tipos de dato.");
    mostrarTipoDato(10.6);
    console.log("¿Es cierto que para JavaScript true es == 1?: " + convertirBooleanoStringEspaniol(true == 1));
}


export function yoObjeto(objeto) {
    let cadenaFinal = "";
    for (const claveAtributo in objeto) {
        cadenaFinal += claveAtributo + " " + objeto[claveAtributo];
    }
    console.log(cadenaFinal);
}


export function dobleDeElementos(lista) {
    return lista.map(numero => numero * 2);
}


export function trianguloDeAsteriscos1(caracter, cantBase) {
    let cadenaFinal = "";
    for (let i = 1; i <= cantBase; i++) {
        if (i !== 1)
            cadenaFinal += "\n";
        cadenaFinal += caracter.repeat(i);
    }
    console.log(cadenaFinal);
}
export function trianguloDeAsteriscos2(caracterInterior, caracterExterior, niveles) {
    let cadenaExterior;
    let cadenaFinal = "";
    let cantCaracteresInteriores = 1;
    let cantCaracteresExteriores = niveles - 1;

    for (let nivelActual = 0; nivelActual < niveles; nivelActual++) {
        if (nivelActual !== 0)
            cadenaFinal += "\n";

        cadenaExterior = caracterExterior.repeat(cantCaracteresExteriores);
        cadenaFinal += cadenaExterior;
        cadenaFinal += caracterInterior.repeat(nivelActual * 2 + 1);
        cadenaFinal += cadenaExterior;

        cantCaracteresInteriores = cantCaracteresInteriores * 2 + 1;
        cantCaracteresExteriores--;
    }

    console.log(cadenaFinal);
}


export function nombresConA(nombres) {
    return nombres.filter(nombre => sacarMayusculasYTildes(nombre).includes("a"));
}


export function reemplazarPalabras(cadena, aReemplazar, reemplazo) {
    return cadena.replace(aReemplazar, reemplazo);
}


export function cortarTexto(cadena, numCaracteres) {
    return cadena.slice(0, numCaracteres);
}


export function stringConSeparador(listaCadenas, separador) {
    return listaCadenas.join(separador);
}


export function calculadoraDeRecaudacion(listaRecuadaciones) {
    return listaRecuadaciones.reduce((recaudacionFinal, recaudacion) => recaudacionFinal += recaudacion.total, 0);
}