//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let elUsuario=JSON.parse(localStorage.getItem("usuario"));





document.addEventListener("DOMContentLoaded", function (e) {

    armaTexto()

});

function armaTexto(){
    let texto="";

texto=`

        <div>
        ${elUsuario.imagen} <br>

        <label>NOMBRE: </label>
        <label id="etiquetaNombre">${elUsuario.nombre}</label><br>

        <label>APELLIDO: </label>
        <labelid="etiquetaApellido" >${elUsuario.apellido}</label><br>

        <label>MAIL: </label>
        <labelid="etiquetaMail">${elUsuario.mail}</label><br>

        <label>TELEFONO: </label>

        <label id="etiquetaTelefono" >${elUsuario.telefono}</label><br>

       
        </div>   





        <div>
           
        
      

        <label>NOMBRE: </label>
        <input type="text" id="elNombre" value=""></input><br>

        <label>APELLIDO: </label>
        <input type="text" id="elApellido" value=""></input><br>

        <label>MAIL: </label>
        <input type="text" id="elMail" value=""></input><br>

        <label>TELEFONO: </label>

        <input type="text" id="elTelefono" value=""></input><br>

        <input type="button" value="modificar" onclick="cambiar()"></input>


        </div>

    `




    document.getElementById("infoPerfil").innerHTML = (texto);


}



{/* <div class="col-md-8 order-md-1">
<label for="zip">Imágenes</label>
<div class="needsclick dz-clickable" id="file-upload">
  <div class="dz-message needsclick">
    Arrastra tus fotos aquí<br>
  </div>
</div>
</div> */}



function cambiar(){



    //defino los distintos parametros, el nombre
    elUsuario.nombre=document.getElementById("elNombre").value;
    //apellido
    elUsuario.apellido=document.getElementById("elApellido").value;
    //el mail
    elUsuario.mail=document.getElementById("elMail").value;
    //telefono
     elUsuario.telefono=document.getElementById("elTelefono").value;
     // password
     elUsuario.password
     elUsuario.imagen="";



     localStorage.clear();

     localStorage.setItem("usuario",JSON.stringify(elUsuario))

    armaTexto();

}

