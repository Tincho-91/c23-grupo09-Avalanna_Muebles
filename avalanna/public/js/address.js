window.addEventListener("load", function () {

    const inputs = document.querySelectorAll("input")
    const divs = document.querySelectorAll("div")

    const addErrorP = function(element){
        const errorP = document.querySelector(`.form_main_section-div-${element.name} p`)
        errorP.classList.add(`error-${element.name}`)
        const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
        errorP.innerText=`"${labelContent.toUpperCase()}" no puede estar vacío`
        divs.forEach(div=>{
            const oldErrorP= document.querySelector(`.error-${element.name}`)
            const rightDiv = document.querySelector(`.form_main_section-div-${element.name}`)
            oldErrorP ? rightDiv.replaceChild(errorP, oldErrorP) : rightDiv.appendChild(errorP)
        })
        element.style.border= "2px solid red"
        element.style.backgroundColor = "rgba(255,0,0,10%)"
    }

    const deleteError = function(element){
        const childP = document.querySelector(`.error-${element.name}`)
        childP ? childP.innerText = null : null
        element.style.backgroundColor= "var(--color-beige)"
                element.style.border = "1px solid black"
    }

    const min = function (value, num){
        return value.length >= num
    }

    const validation = function(element){
        if (element.value == "") {
            addErrorP(element)
        }else{
            deleteError(element)
        }
        
        if (element.name == "country" || element.name == "province" || element.name == "locality" || element.name == "streetName") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 3)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 3 caracteres`
            }else{
                deleteError(element)
            }
        }

        if (element.name == "postalCode") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 4)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 4 caracteres`
            }else if (element.value == "") {
                addErrorP(element)
            }else{
                deleteError(element)
            }
        }

    }

    inputs.forEach(input => {
        input.addEventListener("blur", function(e){
            validation(this)
        })
    });
    
})