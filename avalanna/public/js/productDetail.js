window.onload = async () =>{
    const buttonAdd = document.querySelector(".productDetail-button-cart");
    const cartIcon = document.querySelector(".fa-cart-shopping")
 
    console.log("window.location", window.location);
    const path = window.location.href

    const params = path.split('/');

    const id = params.pop();
    console.log("id", id); 
    
    let productsArray =[]
    const getProducts = JSON.parse(localStorage.getItem("addedToCart"))


    const resp = await fetch(`http://localhost:3000/api/products/detail/${id}`)

    const product = await resp.json();

    if (getProducts) {
        productsArray = getProducts;
        cartIcon.style.color = "green"
        productsArray.forEach( element=> {
            if (element.id == product.id) {
                buttonAdd.textContent = 'Agregado al Carrito'

                console.log("element", element);
            }
        });
    }
    
    buttonAdd.addEventListener("click", async function(e){
     
    console.log("product", product);

    productsArray = productsArray.filter(element => element.id != product.id)
        productsArray.push(product)
        const productsJson = JSON.stringify(productsArray)
        localStorage.setItem("addedToCart", productsJson )
        console.log("localstorage", localStorage.getItem("addedToCart"));
        buttonAdd.innerText = 'Agregado al Carrito'
        
        Swal.fire({
            customClass: {
                confirmButton: 'swalBtnColor',
              },
            icon: "success",
            title: "¡Añadido!",
            text: "Producto añadido al carrito con éxito",
            footer: '',
          
          });
        document.querySelector(".swalBtnColor").style.backgroundColor = "black"

    })


}