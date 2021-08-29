var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class=" justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4><br>
                        <small class="text-muted">` + category.description + ` </small><br>
                        <small class="text-muted"><strong>`+category.currency + category.cost + `</strong> </small>
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = (htmlContentToAppend);
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {                                       
            categoriesArray = resultObj.data;
            //esto es para ordenar de forma ascendente si cambio el orden de a y b lo hago descendente
            categoriesArray.sort(function(a, b){return a - b});
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
        
    });
});
//-----------------------------------Parte 2-----------------------------------------
//aca hago la function para que filtre por minimo y maximo  
let min;
let max;

function filtra(){
    //hago un array para no sobrescribir el original
    let preFiltro=[];
    //capturo el valor de maximo y minimo del html
    
    let min= document.getElementById("pMin").value;
    
    let max=document.getElementById("pMax").value;

    //lo que hago aca es ver si hay valores en los inputs del filtro
    if(min==""){
        min=0;
    }else{
        
      min=validaQueSeaNumero(min); 
    }
    

    if(max==""){
            //no me corrio con maxint, preguntar por que???
        max=1000000000;
        
    }else{
        
       max=validaQueSeaNumero(max);

    }
    
    

    //recorro el array y veo que objetos cumplen con los paramentros de filtrado
    for (let i = 0; i<categoriesArray.length; i++) {

        var productoActual = categoriesArray[i];

            if (parseInt(productoActual.cost) > min && parseInt(productoActual.cost) < max) {

                preFiltro.push(productoActual);
            }
      }
      
      //dibugo la tabla con los productos 
      if(preFiltro.length>0){
        showCategoriesList(preFiltro);  
      }else{
        document.getElementById("cat-list-container").innerHTML="NO HAY PRODUCTO QUE CUMPLAN CON ESOS PARAMETROS";
      }
      

      //vacio los imputs
      document.getElementById("pMin").value = "";
      document.getElementById("pMax").value = "";
}





function validaQueSeaNumero(num){
        //lo que hago aca es ver si hay valores en los inputs del filtro

     if(!isNaN(num)){
        alert("llegue");
        num=parseInt(num);
        alert(num);

        return num;
        }else {
        alert("solo puede ingresar numeros o dejar el campo vacio");
        }

}
//----------------------AREA DEL BUSCADOR-------------------------------


function buscador(){

    let preFiltro=[];

    let txtBuscado=document.getElementById("txtBuscador").value.toLowerCase();

    for(let producto of categoriesArray){

        let elNombre=producto.name.toLowerCase();
            //indexof retorna -1 cuando nno encuentra el valor, entonces si encontro el valor que retorna sera distinto de 1 
        if(elNombre.indexof(txtBuscado) !== -1){
            preFiltro.push(producto);
        }
    }

    if(preFiltro.length>0){
        showCategoriesList(preFiltro);  
      }else{
        document.getElementById("cat-list-container").innerHTML="NO HAY PRODUCTO QUE CUMPLAN CON ESOS PARAMETROS";
      }
}

//document.getElementById('txtBuscador').addEventListener('keyup',buscador())


// ORDENAMIENTO POR RELEVANCIA


function relevancia(){
    let ordenado=[];



    ordenado=categoriesArray.sort(function(a, b) {
        return b.soldCount - a.soldCount;
      });

    showCategoriesList(ordenado);
}




function ascendente(){
    let ordenado=[];

    ordenado=categoriesArray.sort(function(a, b) {
        return a.cost - b.cost;
      });

    showCategoriesList(ordenado);
}



function descendente(){

    let ordenado=[];

    ordenado=categoriesArray.sort(function(a, b) {
        return b.cost - a.cost;
      });

    showCategoriesList(ordenado);
}