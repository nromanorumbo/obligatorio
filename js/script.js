//recupero el usuario conectado en sesion storage y lo asigno a una variable
let usuario=JSON.parse(localStorage.getItem("usuario"));


// aca lo que hago es  verifico que si no existe un usuario lo redirijo a login" 


 if(usuario==null){
   location.href="login.html";
 }


 				 //aca meto el nombre del logueado
          document.getElementById('dropdownMenuLink').innerHTML=(usuario.nombre).toUpperCase();

// document.addEventListener("DOMContentLoaded", ()=>{
//   let usuario= JSON.parse(sessionStorage.getItem("usuario"));
//   if(usuario.estado!=="conectado"){
//     location.href="index.html";
//   }
// });

//asigno el nombre del usuario conectado
//document.getElementById("nomLogueado").innerHTML="bienvenido "+usuario.nombre;


