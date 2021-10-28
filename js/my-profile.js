//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let elUsuario=JSON.parse(sessionStorage.getItem("usuario"));





document.addEventListener("DOMContentLoaded", function (e) {


    let texto="";

texto=`
        <div>
        <img src="img/img_avatar2.png" id="imagenPerfil"><br>

        <label>NOMBRE: </label>
        <input type="text" id="elNombre" value="${elUsuario.nombre}"></input><br>

        <label>APELLIDO: </label>
        <input type="text" id="elApellido" value="${elUsuario.apellido}"></input><br>

        <label>MAIL: </label>
        <input type="text" id="elMail" value="${elUsuario.mail}"></input><br>

        <label>TELEFONO: </label>
        <input type="text" id="elTelefono" value="${elUsuario.telefono}"></input><br>

        <input type="button" value="modificar" onclick="cambiar()"></input>


        </div>

    `




    document.getElementById("infoPerfil").innerHTML = (texto);

});


function cambiar(){

    //defino los distintos parametros, el nombre
    elUsuario.nombre=document.getElementById("elNombre").value;
    //apellido
    elUsuario.apellido=document.getElementById("elApellido").value;
    //el mail
    elUsuario.mail=document.getElementById("elMail").value;
    //telefono
     elUsuario.telefono=document.getElementById("elTelefono").value;


     sessionStorage.clear();

     sessionStorage.setItem("usuario",JSON.stringify(usuario))


}

