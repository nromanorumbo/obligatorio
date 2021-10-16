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
//    document.getElementsByTagName("input").addEventListener("change",function(e){

//     cambiaCantidades();

//     });

//lo que hago aca es con el array que traigo de la api armo el html para mostrarlo 

function muestraCarrito(array){

    let producto = "";
    let total=0;
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
                        <td><input type="number" id="cant${i}"  min="1" max="100" value=${cantidad} onchange='cambiaCantidades()'><br> </td>
                        <td id='resultado${i}'>${cuanto}</td> 
                        </tr>
                        `
                        
          
        document.getElementById("elCarro").innerHTML = (producto);
    }
    Swal.fire("TOTAL ACTUAL: U$S"+total.toString());
}


function cambiaCantidades(){
    //invoco todo los elementos class precio y me devuelve un array
    let precio=document.getElementsByClassName("precio");
    //me traigo los imput que son las cantidades y armo otrio array el cual deve de coincidir el indice con el de precios
    let cantidad= document.getElementsByTagName('input');

    let total=0;
    
    //recorro el array de precios
    for (let i=0; i<precio.length; i++){

        
       let elPrecio=parseFloat(precio[i].innerHTML);

        let laCantidad=parseInt(cantidad[i].value);
        let subtotal=elPrecio*laCantidad;
        

        total+=subtotal;
        //armo cuanto le custa la cantidad de 1 item que quiere comprar
        document.getElementById('resultado'+i).innerHTML=subtotal;
    }
    Swal.fire("TOTAL ACTUAL: U$S"+total.toString());
}