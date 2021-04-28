let ApiData;
let sortOrder = 1;

let getData =()=>{
   return fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=50&api_key=Wi41OWBvzKEWUcx1ss2apUDN1tg7f2v6Yxt8td3l')
  .then(response => response.json())
  .then(data =>  data.photos);
    

}

let loader = (visibility)=>{
    document.getElementById("loader").style.display = visibility;
//determines visibility

}


let sortByDate=(a, b) => {

    /*
    Found it had to sort the pictures by date so i had to sort by ID
    console.log(a.earth_date);
    console.log(b.earth_date);
    */
  
    //let c = new Date(b.earth_date).getTime() - new Date(a.earth_date).getTime();
    let c = a.id > b.id ? -1 : 1 
    return c * sortOrder;
}



let createHtml =()=>{
    loader("block");
    
    if(ApiData)
    {
        let imageHtml = "";
        
        
             ApiData.forEach(element => {
                imageHtml+=` <figure class= ”gallery__item gallery__item--1">
                <img src='${element.img_src}' class="gallery__img" alt="Image 1">
              </figure>`
                
            });
            
        document.getElementById("gallery").innerHTML = imageHtml;
        loader("none");
    }
    else{
        getData().then(data =>{
            ApiData = data;
            let imageHtml ="";
          
                 ApiData.forEach(element => {
                    imageHtml +=` <figure class=”gallery__item gallery__item--1">
                    <img src='${element.img_src}' class="gallery__img" alt="Image 1">
                  </figure>`
                    
                });
                
            document.getElementById("gallery").innerHTML = imageHtml;
           loader("none");

        })
}
}



(function(){
    createHtml();
    document.getElementById("sort").addEventListener("click",()=>{
     sortData()
    })
 
    document.getElementById("refresh").addEventListener("click",()=>{
     refreshData();
    })
 })()


let refreshData =()=>{
    ApiData = null;
    document.getElementById("gallery").innerHTML = null;
    createHtml();

}

let sortData =()=>{
    sortOrder =- sortOrder;
   
    ApiData.sort(sortByDate);
    createHtml();

}