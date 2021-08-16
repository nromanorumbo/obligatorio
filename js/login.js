

function Validar()
		  {
              //aca esta hecho de dos manera una le paso por paramentros y la otra lo capturo, preguntar cualq ueire
		   user=document.getElementById("uNom");
		   pwr=document.getElementById("pwr");
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

			   //luego de tener usuario y contraseña guardo el usuario
			  	 sessionStorage.setItem("usuario",JSON.stringify(usuario))

			   //aca redirijo a la pagina de inicio luego de que se loguea
			   window.location.href=("index.html");
			   return true;
			  }
			}
		  }