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

//lo que hago aca es con el array que traigo de la api armo el html para mostrarlo 

function muestraCarrito(array){

    let htmlContentToAppend = "";
    let total=0;

    for(let i=0; i < array.articles.length; i++){

        let elCarro = array.articles[i];
        //veo si esta en doilares o pesos
        let moneda=elCarro.currency;
        //transformo el texto a numero
        let cuanto=parseInt(elCarro.unitCost);


        if (moneda=="UYU"){

            cuanto=(cuanto/40)*elCarro.count;
            }else{
               cuanto=cuanto*elCarro.count 
            }
            
             
             

        total+=cuanto;




        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" onclick="cambio()">
            <div class="row">
                <div class="col-3">
                    <img src="` + elCarro.src + `" alt="` + elCarro.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class=" justify-content-between">
                        <h4 class="mb-1">`+ elCarro.name +`</h4><br>
                        <small class="text-muted"><strong>`+cuanto + `</strong> </small>
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = (htmlContentToAppend);
    }
    Swal.fire("U$S"+total.toString());
}