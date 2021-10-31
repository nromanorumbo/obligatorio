

function validar()
		  {
              //aca esta hecho de dos manera una le paso por paramentros y la otra lo capturo, preguntar cualq ueire
		   let user=document.getElementById("uNom");
		   let pwr=document.getElementById("pwr");
		   //esto es un objeto Usuario
			let usuario={};

		   
		   if(user.value.trim()==="")
			{
			 alert("El campo Nombre esta vacio");
			 user.focus();
			 return false;
			}
		   else
			{
			 if(pwr.value.trim()==="")
			  {
			   alert("El campo Password esta vacio");
			   pwd.focus();
			   return false;
			  }
			 else
			  {
				  
				  //aca lo que hago es guardar el usuario y contraseña en local storage

			  //le asigno a la prop nombre del usuario el valor capturado
				usuario.nombre = user.value;



				  //hago lo mismo con la contraseña
			   	usuario.password = pwr.value;
				   
				   //le seteo el estado como conectado
				   usuario.estado="conectado";

				   usuario.apellido="DOE";
				   usuario.mail="correo@test.com.uy";
				   usuario.telefono="2221133";
				   usuario.imagen=`<a href="https://imgbb.com/"><img src="https://i.ibb.co/R0FBYFQ/img-avatar2.png" alt="img-avatar2" border="0"></a>`

			   //luego de tener usuario y contraseña guardo el usuario
			  	 localStorage.setItem("usuario",JSON.stringify(usuario))

			   //aca redirijo a la pagina de inicio luego de que se loguea
			   window.location.href=("index.html");
			   return true;
			  }
			}

			
		  }

function desconectar(){
					signOut();
					localStorage.clear();
					window.location.href=("login.html");
					alert("chau");

				  }


      function onSignIn(googleUser) {


		

        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);


					let usuario={};
					  //le asigno a la prop nombre del usuario el valor capturado
					  usuario.nombre = profile.getName();

					  //aca meto el nombre del logueado
					  document.getElementById('cont1').innerHTML='Párrafo de texto';

					  sessionStorage.setItem("usuario",JSON.stringify(usuario))
		
		alert("llegue");
		window.location.href=("index.html");
      }

	  
function signOut() {
			 var auth2 = gapi.auth2.getAuthInstance();
				 auth2.signOut().then(function () {
				console.log('User signed out.');
			 });
		  }
//codigo requerido por google
function onLoad() {
			gapi.load('auth2', function() {
			  gapi.auth2.init();
			});
		  }