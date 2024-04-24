window.onload = async () =>{
    const main = document.querySelector(".productCart__main")
    const containerArticle = document.querySelector(".productCart__main__section")
    const getProducts = JSON.parse(localStorage.getItem("addedToCart"));
    console.log("getProducts,", getProducts);
    const resume=document.querySelector(".subtotal_precio")
    const h1 = document.querySelector("h1")
    const buttons = document.querySelectorAll(".productCart__main_buttons")
   
    const resumenSubtotal = document.querySelector(".productCart__main__section_article-resumen-subtotal")
    const resumenTotal = document.querySelector(".productCart__main__section_article-resumen-total")
    let calcSubtotal = 0;
    let calcDiscount = 0
    const discountResume = document.querySelector(".productCart__main__section_article-resumen-discounts")

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
            const getPUnity = localStorage.getItem(`unity-${product.id}`)
            getPUnity > 0 ? p.innerText = getPUnity : p.innerText = "1"
            console.log("PLOCALSTORATE", getPUnity);
            divButtons.appendChild(p);


            const buttonPlus = document.createElement("button");
            buttonPlus.classList.add("uno");
            buttonPlus.innerText="+"
            divButtons.appendChild(buttonPlus)
        
            const h4 = document.createElement("h4")
            h4.classList.add("productCart__main__section-div-detalle-subtotal")
            h4.innerText = `Precio normal $${product.price}`
            divDetail.appendChild(h4)

            const h4ActualPrice = document.createElement("h4")
            h4ActualPrice.classList.add("productCart__main__section-div-detalle-subtotal")
            const calc = (product.price * product.discount) / 100 
            h4ActualPrice.innerText = `Precio actual $${product.price - calc}`
            divDetail.appendChild(h4ActualPrice)

            containerArticle.appendChild(container)
        
            
            calcSubtotal = calcSubtotal + (+p.innerText * product.price)
            resumenSubtotal.innerText = `$${calcSubtotal}`

            calcDiscount = calcDiscount + (+p.innerText * calc)
            discountResume.innerText = `$${calcDiscount}`

            calcTotal = calcSubtotal - calcDiscount
            resumenTotal.innerText = `$${calcTotal}`
            
            buttonMinus.addEventListener("click", async function(e){
            let pValue= p.textContent;
            const newP = +pValue - 1 
            p.innerText = newP

            calcSubtotal = calcSubtotal - product.price
           
            resumenSubtotal.innerText = `$${calcSubtotal}`

            calcDiscount = calcDiscount - calc
            discountResume.innerText = `$${calcDiscount}`
            
            calcTotal = calcSubtotal - calcDiscount
            resumenTotal.innerText = `$${calcTotal}`
            localStorage.setItem(`unity-${product.id}`, p.innerText)

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
                        title: "¡Eliminado!",
                        text: "El producto se ha eliminado de su carrito",
                        icon: "success",
                        confirmButtonColor:"black"
                      });

                      
            
                     
                      const newArray = JSON.parse(localStorage.getItem("addedToCart"));
                      const arrayProducts = newArray.filter(element=> element.id != product.id)
                      const productsJson = JSON.stringify(arrayProducts);
                      localStorage.setItem("addedToCart", productsJson)
                      containerArticle.removeChild(container)
                      location.reload()
                     
                    }else{
                      p.innerText = 1
                      
                      calcSubtotal = calcSubtotal + product.price
            resumenSubtotal.innerText = `$${calcSubtotal}`
            
            calcDiscount = calcDiscount + calc
            discountResume.innerText = `$${calcDiscount}`

            calcTotal = calcSubtotal - calcDiscount
            resumenTotal.innerText = `$${calcTotal}`
            
                  }
                    
                  })
                 
              
            }
            console.log("a ver localstorage", localStorage.getItem("addedToCart"));
            })

            buttonPlus.addEventListener("click", function(e){
            let pValue= p.textContent;
            const newP = +pValue + 1 
            p.innerText = newP
            
            calcSubtotal = calcSubtotal + product.price
            resumenSubtotal.innerText = `$${calcSubtotal}`
            
            calcDiscount = calcDiscount + calc
            discountResume.innerText = `$${calcDiscount}`

            calcTotal = calcSubtotal - calcDiscount
            resumenTotal.innerText = `$${calcTotal}`

            localStorage.setItem(`unity-${product.id}`, p.innerText)
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
        const backHome = document.createElement("a");
        backHome.href = "/"
        backHome.classList.add("productCart__main__a")
        backHome.innerText="Volver al Inicio"
        main.appendChild(backHome)

    }

    



}