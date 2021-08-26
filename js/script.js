//recupero el usuario conectado en sesion storage y lo asigno a una variable
let usuario=JSON.parse(sessionStorage.getItem("usuario"));


// aca lo que hago es  verifico que si no existe un usuario lo redirijo a login" 


 if(usuario==null){
   location.href="login.html";
 }

<<<<<<< HEAD

 				 //aca meto el nombre del logueado
          document.getElementById('nomLogueado').innerHTML=(usuario.nombre).toUpperCase();

=======
>>>>>>> refs/remotes/origin/main
// document.addEventListener("DOMContentLoaded", ()=>{
//   let usuario= JSON.parse(sessionStorage.getItem("usuario"));
//   if(usuario.estado!=="conectado"){
//     location.href="index.html";
//   }
// });

//asigno el nombre del usuario conectado
//document.getElementById("nomLogueado").innerHTML="bienvenido "+usuario.nombre;


