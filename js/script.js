//recupero el usuario conectado en sesion storage y lo asigno a una variable
let usuario=JSON.parse(sessionStorage.getItem("usuario"));

//asigno el nombre del usuario conectado
document.getElementById("nomLogueado").innerHTML="bienvenido "+usuario.nombre;


