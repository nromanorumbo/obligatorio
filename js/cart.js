//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var carritoArray = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {                                       
            carritoArray = resultObj.data;
          
            //Muestro las categorías ordenadas
            muestraCarrito(carritoArray);
        }
        
    });

}); 

//esto es para que este escuchando cuadno hay cambios
   document.getElementById("canti").addEventListener("click",function(){

        let subtotal=0;




        document.getElementById("subtotal").innerHTML = (subtotal);

    });

//lo que hago aca es con el array que traigo de la api armo el html para mostrarlo 

function muestraCarrito(array){

    let htmlContentToAppend = "";
    let total=0;
    let cantidad=0;
    let unitario=0;

    for(let i=0; i < array.articles.length; i++){

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




        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" >
            <div class="row">
                <div class="col-3">
                    <img src="` + elCarro.src + `" alt="` + elCarro.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class=" justify-content-between">
                        <h4 class="mb-1">`+ elCarro.name +`</h4><br>
                        <label for="cantidad">CANTIDAD : </label>
                        <input type="number" id="canti"  min="1" max="100" value="`+cantidad+`"><br>

                        <label for="unitario">UNITARIO : </label>
                        <small class="text-muted" id="unitario"><strong>`+unitario + `</strong> </small><br>

                        <label for="subTotal">SUBTOTAL : </label>
                        <small class="text-muted" id="subtotal"><strong>`+cuanto + `</strong> </small>
                        
                        
                    </div>

                </div>
            </div>
        </div>
        `
          
        document.getElementById("cat-list-container").innerHTML = (htmlContentToAppend);
    }
    Swal.fire("TOTAL ACTUAL: U$S"+total.toString());
}