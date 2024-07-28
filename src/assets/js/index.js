
jQuery(function(){
    const url = new URL(document.URL)
    const params = new URLSearchParams(url.search)
    console.log(params.get("tag"))
})