//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// traijo la consulta a la API por el producto ese

let comentariosProducto=[];
let infoProductos={};



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


//traigo de la api los comentarios de ese producto

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {                                       
            comentariosProducto = resultObj.data;

            //Muestro las categorías ordenadas
            muestraComentarios(comentariosProducto);
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



        fotos+=`
        <img onmouseover="preview.src=img`+i+`.src" name="img`+i+`" src="`+foto+`" alt="" />`





        document.getElementById("carrete").innerHTML = (fotos);






        // fotos += `
        // <div class="list-group-item list-group-item-action">
        //     <div class="row">
 
        //     <img src="` + foto + `" alt="" class="img-thumbnail">
                 
        //     </div>
        // </div>
        // `

        // document.getElementById("fotos-list-container").innerHTML = (fotos);
    }
    document.getElementById("imgPrimaria").innerHTML = (`<img name="preview" src="`+producto.images[0]+`" alt=""/>`)
}




function caliProducto(valor){
    let comentario={};

let coment=document.getElementById('comentarios').value;
    if(coment.trim()!=""){

           let usu=JSON.parse(sessionStorage.getItem("usuario"));
            let fecha=new Date();

            comentario.score=valor;
            comentario.description=coment;
            comentario.user=usu.nombre;
            comentario.dateTime=fecha;

            comentariosProducto.push(comentario);

            //borro el comentario agregado
            document.getElementById("comentarios").value="";

            muestraComentarios(comentariosProducto);

    }
    //no se si tengo que validar ya que el valor no lo puede ingresar el usuario, preguntar eso

}




//mostrar los comentarios


function muestraComentarios(comentariosProducto){


    let htmlContentToAppend = "";
    
    for(let i = 0; i < comentariosProducto.length; i++){
        let nuevoComentario = comentariosProducto[i];

        let dibujaEstrellas=califico(nuevoComentario.score);

        htmlContentToAppend += `
       <tr>
            <td>${nuevoComentario.user}</td>
            <td>${nuevoComentario.description}</td>
            <td>${dibujaEstrellas}</td>
       </tr>

        `

        document.getElementById("laTabla").innerHTML = (htmlContentToAppend);


    }
}


function califico(num){
    let estrellas="";

    for(let i=1;i<=5;i++){
        if(i<=num){
            estrellas+=`<i class="fas fa-star"></i>`;
        }else{
            estrellas+=`<i class="far fa-star"></i> `;
        }
    }
    return estrellas;
}