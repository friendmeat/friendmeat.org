window.onload = function(){
    
    let shadowbox = document.querySelector("div#shadowbox");
    console.log(shadowbox);

    let galleryItems = document.querySelectorAll("div.gallery-item")
    galleryItems.forEach(item=>{
        item.addEventListener("click", (event)=>{
            console.log(event)
        })
    })
}