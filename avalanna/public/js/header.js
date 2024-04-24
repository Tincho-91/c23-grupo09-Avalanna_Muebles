window.addEventListener('load', function(){
    const cartProductsStorage = JSON.parse(localStorage.getItem("addedToCart"))
    const pCartLentgh = document.createElement("p")
    const divIconHeader = document.querySelector(".iconos-profile-without-session")
    cartProductsStorage.length > 0 ? pCartLentgh.innerText = cartProductsStorage.length : null

    divIconHeader.appendChild(pCartLentgh)
    console.log("pcart", pCartLentgh);

})