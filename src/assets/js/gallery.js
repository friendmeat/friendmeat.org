function disableScroll() {
    // Get the current page scroll position
    scrollTop = document.documentElement.scrollTop;
    scrollLeft = document.documentElement.scrollLeft,

    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () { };
}

window.onload = function(){
    
    let shadowbox = document.querySelector("div#shadowbox");
    let shadowboxImage = shadowbox.querySelector("img");
    console.log(shadowboxImage);
    shadowbox.addEventListener("click", ()=>{
        shadowbox.classList.replace("opacity-100", "opacity-0")
        shadowbox.classList.toggle("pointer-events-none");

        enableScroll()
    })

    let galleryItems = document.querySelectorAll("div.gallery-item")
    galleryItems.forEach(item=>{
        item.addEventListener("click", ()=>{
            img = item.querySelector("img").attributes.src.value
            shadowboxImage.setAttribute("src", img)
            
            shadowbox.classList.toggle("pointer-events-none");
            shadowbox.classList.replace("opacity-0", "opacity-100")

            
            disableScroll()
        })
    })
}