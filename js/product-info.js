//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// traijo la consulta a la API

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {                                       
            infoProductos = resultObj.data;

            //Muestro las categorías ordenadas
            muestraProducto(infoProductos);
        }
        
    });
});


//hago la function para poder mostrar en pantalla

function muestraProducto(producto){

    let comboCosto=`<small class="text-muted"><strong>`+producto.currency + producto.cost + `</strong> </small>`


//coloco el nombre del producto como titulo
    document.getElementById("nomProd").innerHTML=(producto.name);
    //pongo la descri
    document.getElementById("descriProducto").innerHTML=(producto.description);
    //armo el combo precio y moneda
    document.getElementById("precioProducto").innerHTML=(comboCosto);







    let fotos = "";
    for(let i = 0; i < producto.images.length; i++){
        let foto = producto.images[i];

        fotos += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
 
            <img src="` + foto + `" alt="" class="img-thumbnail">
                 
            </div>
        </div>
        `

        document.getElementById("fotos-list-container").innerHTML = (fotos);
    }
}




function caliProducto(cuantas){

    


}