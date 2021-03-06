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


//ENTREGA 4 traigo todos los productos

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {                                       
            productosArray = resultObj.data;
            // //esto es para ordenar de forma ascendente si cambio el orden de a y b lo hago descendente
            // productosArray.sort(function(a, b){return a - b});
            //hago que muestre los favoritos
            

            armaProductosRelacionados(productosArray);
            
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
            //aca capturo el nombre del usuario del sessionstorage
           let usu=JSON.parse(sessionStorage.getItem("usuario"));

           //tomo la fecha actual
            let fecha=new Date();

            comentario.score=valor;
            comentario.description=coment;
            comentario.user=usu.nombre;
            comentario.dateTime=fecha;

            comentariosProducto.push(comentario);

            //borro el comentario agregado
            vaciaTodo();

            

            muestraComentarios(comentariosProducto);

            Swal.fire(
                'BUEN TRABAJO!',
                'Agregaste tu Comentario con EXITOOO!!',
                'success'
              )

    }else{
        Swal.fire('tiene que introducir algun comentario para calificar');
    }
    //no se si tengo que validar ya que el valor no lo puede ingresar el usuario, preguntar eso

}

function vaciaTodo(){
    document.getElementById("comentarios").value="";


    // document.getElementById("radio1").checked=false;
    // document.getElementById("radio2").checked=false;
    // document.getElementById("radio3").checked=false;
    // document.getElementById("radio4").checked=false;
    // document.getElementById("radio5").checked=false;


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


function califico(score){
    let estrellas="";

    for(let i=1;i<=5;i++){
        if(i<=score){
            estrellas+=`<i class="fas fa-star"></i>`;
        }else{
            estrellas+=`<i class="far fa-star"></i> `;
        }
    }
    return estrellas;
}




function armaProductosRelacionados(arrayP){
    let productosRelacionados=[];
    
    let losProductos=infoProductos.relatedProducts

    for(let i=0; i<losProductos.length;i++){        

        productosRelacionados.push(arrayP[losProductos[i]]);
        
        
    }

muestraProductosRelacionados(productosRelacionados);

}


function muestraProductosRelacionados(algo){
    let htmlContentToAppend = "";

    htmlContentToAppend=(`<div class="carousel-item active"><img src="`+algo[0].imgSrc+`" class="d-block w-10" alt="`+algo[0].description+`"></div>`)
    

    for(let i = 1; i < algo.length; i++){
        let category = algo[i];

        htmlContentToAppend += 
        //`
        // <div class="list-group-item list-group-item-action" onclick="cambio()">
        //     <div class="row">
        //         <div class="col-3">
        //             <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
        //         </div>
                
        //     </div>
        // </div>
        // `




        `<div class="carousel-item">
            <img src="`+ category.imgSrc +`" class="d-block w-10" alt="` + category.description + `">
        </div>`


        document.getElementById("cat-list-container").innerHTML = (htmlContentToAppend);
    }

}



async function myFunction(){
 let text="";
 let cant=0;
 let comentario={};

     text  =  await Swal.fire({
        input: 'textarea',
        inputLabel: 'CALIFICAR',
        inputPlaceholder: 'Ingrese su comentario...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      
      if (text) {

        cant = await Swal.fire({
        title: 'Como Calificas ese auto?',
        icon: 'question',
        input: 'range',
        inputLabel: 'Your age',
        inputAttributes: {
          min: 1,
          max: 5,
          step: 1
        },
        inputValue: 1


        
      })

      if (cant!=0 & text!=""){

        let usu=JSON.parse(sessionStorage.getItem("usuario"));

        let num=parseInt(cant.value)
        let come=text.value;

        //tomo la fecha actual
         let fecha=new Date();

         comentario.score=num;
         comentario.description=come;
         comentario.user=usu.nombre;
         comentario.dateTime=fecha;

         comentariosProducto.push(comentario);

         muestraComentarios(comentariosProducto);
         Swal.fire("comentario agregado con exito")
      }
        
      }

    
}