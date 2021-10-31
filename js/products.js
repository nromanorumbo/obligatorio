var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

            








        htmlContentToAppend += `
        
            <div class="col-lg-4 col-md-6 col-sm-12 ">
                <div class="col-6" onclick="cambio()">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                   
                        <h4 class="mb-1">`+ category.name +`</h4><br>
                        <small class="text-muted">` + category.description + ` </small><br>
                        <small class="text-muted"><strong>`+category.currency + category.cost + `</strong> </small>
                        <a class="add-cart cart`+i+`" href="#"> Agregar al Carro</a>
                    

                </div>
            </div>
        
        `

        document.getElementById("cat-list-container").innerHTML = (htmlContentToAppend);
    }
}


//--------------voy a inventar lo del carro------------------------------------------

let carro=document.querySelectorAll('.add-cart');

for(let i=0; i< carro.length; i++){

    carro[i].addEventListener('click',()=>{
        cartNumbers

         
    })

}
function cartNumbers(){
    let productNumber = localStorage.getItem('cartNumbers');

    //toDo
   // localStorage.setItem('cart')
}


//------------------------------------------------FIN CARRO-----------------------------------------

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
    
    //verifico que el valor de max sa mayor que el de min
    if(min<max){
        //recorro el array y veo que objetos cumplen con los paramentros de filtrado
        for (let i = 0; i<categoriesArray.length; i++) {

            var productoActual = categoriesArray[i];
    
                if (parseInt(productoActual.cost) > min && parseInt(productoActual.cost) < max) {
    
                    preFiltro.push(productoActual);
                }
          }


    }
    
      
      //dibugo la tabla con los productos o mensaje de que  no hay productos
      verificaLargoArray(preFiltro);
      

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
        let laDescrip=producto.description.toLowerCase();
            //indexof retorna -1 cuando nno encuentra el valor, entonces si encontro el valor que retorna sera distinto de 1 
        if(elNombre.indexOf(txtBuscado) !== -1 || laDescrip.indexOf(txtBuscado) !== -1 ){
            preFiltro.push(producto);
        }
    }
    verificaLargoArray(preFiltro);
    
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

//funcion para ver que el array tenga algo sino tira mensaje por default
function verificaLargoArray(array){

    if(array.length>0){
        showCategoriesList(array);  
      }else{
        document.getElementById("cat-list-container").innerHTML="NO HAY PRODUCTO QUE CUMPLAN CON ESOS PARAMETROS";

        Swal.fire('No se encontraron productos que cumplan tus parametros');
      }
    
}


function cambio(){
//si cada anuncion tuviera un identificador lo usaria al llamar la API pero como es el mismo para todos solo hago un redirect

location.href="product-info.html";
}