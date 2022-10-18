//ponerle al ejs el id="contenido"
//al final escribir <button onclick="leer-mas()"> Mostrar Más </button>

const articulo = document.querySelector("#contenido");
const button = document.querySelector("click", leerMas)

function leerMas(){
    if(articulo.className === "abierto"){
        //leer menos
        articulo.className = "";
        button.textContent = "Mostrar mas"
    } else {
        //leer mas
        articulo.className = "abierto";
        button.textContent = "Mostrar menos"
    }
}