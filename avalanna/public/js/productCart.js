window.onload = async () =>{
    const containerArticle = document.querySelector(".productCart__main__section")
    const getProducts = JSON.parse(localStorage.getItem("addedToCart"));
    console.log("getProducts,", getProducts);
    console.log("condicion", getProducts.length >= 1);
    const resume=document.querySelector(".subtotal_precio")
    const h1 = document.querySelector("h1")
    const buttons = document.querySelectorAll(".productCart__main_buttons")

    if (getProducts.length >= 1) {
        console.log("hola");
        getProducts.forEach(product =>{
            let container = document.createElement("article");
            container.classList.add("contenedor-detalle");
            const nameH3 = document.createElement("h3")
            nameH3.classList.add("contenedor-detalle-name");
            nameH3.innerText = product.name
            container.appendChild(nameH3)

            const a = document.createElement("a");
            const img = document.createElement("img")
            img.classList.add("imagen-detalle")
            img.src=`/img/${product.image}`
            a.appendChild(img)
            container.appendChild(a)

            const divDetail = document.createElement("div")
            divDetail.classList.add("productCart__main__section-div-detalle")
            const nameH3Div = document.createElement("h3");
            nameH3Div.classList.add("texto-detalle")
            nameH3Div.innerText=product.name
            divDetail.appendChild(nameH3Div);
            console.log(nameH3Div);
            container.appendChild(divDetail)
            

            const divButtons = document.createElement("div");
            divButtons.classList.add("productCart__main__section-div-detalle-buttons")
            divDetail.appendChild(divButtons);

            const buttonMinus = document.createElement("button");
            buttonMinus.classList.add("uno")
            buttonMinus.innerText = "-"
            divButtons.appendChild(buttonMinus);

            const p = document.createElement("p");
            p.innerText="1"
            divButtons.appendChild(p);


            const buttonPlus = document.createElement("button");
            buttonPlus.classList.add("uno");
            buttonPlus.innerText="+"
            divButtons.appendChild(buttonPlus)
        
            const h4 = document.createElement("h4")
            h4.classList.add("productCart__main__section-div-detalle-subtotal")
            h4.innerText = `Precio $${product.price}`
            divDetail.appendChild(h4)
            
            containerArticle.appendChild(container)
            
            
            
            buttonMinus.addEventListener("click", async function(e){
            let pValue= p.textContent;
            const newP = +pValue - 1 
            p.innerText = newP
            if (p.innerText == 0) {
                console.log("hola pase if");
             Swal.fire({
                    title: "¿Quieres eliminar este producto de tu carrito?",
                    text: "",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "black",
                    cancelButtonColor: "#C7C1BF",
                    confirmButtonText: "!Si, quiero eliminarlo!"
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                     await Swal.fire({
                        customClass: {
                            confirmButton: 'swalBtnColor',
                          },
                        title: "¡Eliminado!",
                        text: "El producto se ha eliminado de su carrito",
                        icon: "success"
                      });
            
                      const newArray = JSON.parse(localStorage.getItem("addedToCart"));
                      const arrayProducts = newArray.filter(element=> element.id != product.id)
                      const productsJson = JSON.stringify(arrayProducts);
                      localStorage.setItem("addedToCart", productsJson)
                      containerArticle.removeChild(container)
                      location.reload()
                     
                    }else{
                        p.innerText=1

                    }
                    
                  })
              
            }
            console.log("a ver localstorage", localStorage.getItem("addedToCart"));
            })

            buttonPlus.addEventListener("click", function(e){
            let pValue= p.textContent;
            const newP = +pValue + 1 
            p.innerText = newP
            
            })
            console.log("a ver localstorage", localStorage.getItem("addedToCart"));
            
        })

    }else{
        h1.innerText = "Aún no has agregado ningún producto al carrito"
        containerArticle.style.display = "none";
        resume.style.display="none"
        buttons.forEach(element=>{
            element.style.display ="none"
        })

    }

        



}