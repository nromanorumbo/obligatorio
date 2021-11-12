//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var carritoArray = [];
let porcentaje = 0.10;

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {                                       
            carritoArray = resultObj.data;
          
            //Muestro las categorías ordenadas
            muestraCarrito(carritoArray);
        }
        
    });


    document.getElementById("creditoRadio").addEventListener("change", function(){
        porcentaje = 0.10;
        updateTotalCosts();
    });
    
    document.getElementById("cobranzaRadio").addEventListener("change", function(){
        porcentaje = 0.07;
        updateTotalCosts();
    });

    document.getElementById("debitoRadio").addEventListener("change", function(){
        porcentaje = 0.03;
        updateTotalCosts();
    });

}); 



function updateTotalCosts(){
    
    let comissionCostHTML = document.getElementById("comissionText");
    let costoTotalHTML = document.getElementById("costoTotal");

   
   
    let tatalFinal = Math.round(total * (1+porcentaje));

   
    comissionCostHTML.innerHTML = Math.round(porcentaje*100);
    costoTotalHTML.innerHTML = tatalFinal;
}

//esto es para que este escuchando cuadno hay cambios
//    document.getElementsByTagName("input").addEventListener("change",function(e){

//     cambiaCantidades();

//     });

//lo que hago aca es con el array que traigo de la api armo el html para mostrarlo 
let total;

function muestraCarrito(array){

    total=0;
    let producto = "";
    
    let cantidad=0;
    let unitario=0;

    for(let i=0; i < array.articles.length; i++){
        let subtotal=0;

        let elCarro = array.articles[i];
        //veo si esta en doilares o pesos
        let moneda=elCarro.currency;
        //transformo el texto a numero
        let cuanto=parseInt(elCarro.unitCost);
        cantidad=elCarro.count;

        unitario=cuanto;

        if (moneda=="UYU"){
            unitario=(cuanto/40);
            cuanto=unitario*cantidad;
            }else{
               cuanto=unitario*cantidad; 
            }
            
             
             

        total+=cuanto;
            //armo el producto
            producto+=`<tr><td><img src="${elCarro.src}" alt="${elCarro.description}" class="img-thumbnail"></td> 
                        <td> ${elCarro.name}</td>
                        <td class='precio'>${unitario}</td>                        
                        <td>
                        <div>
                        <input class="form-control" type="number" id="cant${i}"  min="1" max="100" value=${cantidad} onchange='cambiaCantidades()' "required"><br> 
                            <div class="invalid-feedback">
                                la cantidad tiene que ser mayor a 0.
                            </div>
                        </div>
                        </td>
                        <td id='resultado${i}'>${cuanto}</td> 
                        </tr>
                        `
                        
          
        document.getElementById("elCarro").innerHTML = (producto);
    }
    //Swal.fire("TOTAL ACTUAL: U$S"+total.toString());
    document.getElementById('productoSubtotal').innerHTML="U$S"+total.toString();
}


function cambiaCantidades(){
    //invoco todo los elementos class precio y me devuelve un array
    let precio=document.getElementsByClassName("precio");
    //me traigo los imput que son las cantidades y armo otrio array el cual deve de coincidir el indice con el de precios
    let cantidad= document.getElementsByTagName('input');

    total=0;
    
    //recorro el array de precios
    for (let i=0; i<precio.length; i++){

        
       let elPrecio=parseFloat(precio[i].innerHTML);
       let actual=document.getElementById('cant'+i)
       let laCantidad=parseInt(cantidad[i].value);
       //puse el comparo por que me cambia la bariable a boolean al hacer el or
       let comparo=laCantidad

        if(comparo="" || comparo<1){
            laCantidad=0;
            actual.classList.add("is-invalid");

        }else{
            actual.classList.remove("is-invalid");
        }

        let subtotal=elPrecio*laCantidad;
        

        total+=subtotal;
        //armo cuanto le custa la cantidad de 1 item que quiere comprar
        document.getElementById('resultado'+i).innerHTML=subtotal;
    }
    
    //Swal.fire("TOTAL ACTUAL: U$S"+total.toString());
    document.getElementById('productoSubtotal').innerHTML="U$S"+total.toString();
    updateTotalCosts();

}




//para que valide antes de enviar 

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

  function CambiaFormaDePago(texto){

    formaDePago=texto;
    document.getElementById("formaDePago").innerHTML=formaDePago;

  }
