window.addEventListener("load", function () {

    const inputs = document.querySelectorAll("input")
    const form = document.querySelector("form")
    const pErrors = document.querySelectorAll(".erroresForm");
    const divs = document.querySelectorAll("div")
    const select = document.querySelector("select")
    

    const addErrorP = function(element){
        const errorP = document.createElement("p");
        errorP.classList.add(`error-${element.name}`)
        errorP.classList.add("erroresForm")
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
        const divFather = document.querySelector(`.form_main_section-div-${element.name}`)        
        childP ? divFather.removeChild(childP) : null
        element.style.backgroundColor= "var(--color-beige)"
                element.style.border = "1px solid black"
    }

    const min = function (value, num){
        return value.length >= num
    }

    const validation = function(element){
        if (element.value == "") {
            console.log("element", element.value);
            addErrorP(element)
        }else{
            deleteError(element)
        }
        
        if (element.name == "NameAndSurname") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 8)) {
                console.log("ACA",min(element.value, 8));
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 8 caracteres`
            }else{
                deleteError(element)
            }
        }

        if (element.name == "email") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 20)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 20 caracteres`
            } else {
                deleteError(element)
            }
        }

        if (element.name == "phoneNumber") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 10)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 10 caracteres`
            }else{
                deleteError(element)
            }
        }

        if (element.name == "password1") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 8)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 8 caracteres`
            }else{
                deleteError(element)
            }
        }

        if (element.name == "password2") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 8)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 8 caracteres`
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
    select.addEventListener("blur", function(e){
        validation(select)
    })

})