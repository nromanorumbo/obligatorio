//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let usuario=JSON.parse(sessionStorage.getItem("usuario"));


document.addEventListener("DOMContentLoaded", function (e) {


    let texto="";

texto=`
        <div>
        <img src="img/img_avatar2.png" id="imagenPerfil"><br>

        <label>NOMBRE: </label>
        <input type="text" id="elNombre" value="${usuario.nombre}"></input>


        </div>

    `




    document.getElementById("infoPerfil").innerHTML = (texto);

});

