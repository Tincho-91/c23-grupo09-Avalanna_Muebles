window.addEventListener("load", function () {

    const inputs = document.querySelectorAll("input")
    const form = document.querySelector("form")
    const pErrors = document.querySelectorAll(".erroresForm");
    const divs = document.querySelectorAll("div")
    

    const addErrorP = function(element){
        const errorP = document.createElement("p");
        errorP.classList.add(`error-${element.name}`)
        errorP.classList.add("erroresForm")
        const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
        errorP.innerText=`${labelContent.toUpperCase()} no puede estar vacío`
        divs.forEach(div=>{
            const oldErrorP= document.querySelector(`.error-${element.name}`)
            const rightDiv = document.querySelector(`.form_main_section-div-${element.name}`)
            oldErrorP ? rightDiv.replaceChild(errorP, oldErrorP) : rightDiv.appendChild(errorP)
        })
    }

    const deleteError = function(element){
        const childP = document.querySelector(`.error-${element.name}`)
        const divFather = document.querySelector(`.form_main_section-div-${element.name}`)        
        childP ? divFather.removeChild(childP) : null
    }

    const min = function (value, num){
        console.log(value >= num);
        return value.length >= num
    }

    const validation = function(element, e){
        if (element.value == "") {
            console.log("element", element.value);
            addErrorP(element)
        }
        if (element.value != "") {
            deleteError(element)
        }
        if (element.name == "name") {
            if (!min(element.value, 5)) {
                console.log("ACA",min(element.value, 5));
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `${labelContent.toUpperCase()} debe tener un mínimo de 5 caracteres`
            }else if (element.value == "") {
                addErrorP(element)
                console.log("hola??");
            }
        }

        if (element.name == "description") {
            if (!min(element.value, 20)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `${labelContent.toUpperCase()} debe tener un mínimo de 20 caracteres`
            }else if (element.value == "") {
                addErrorP(element)
            }else{
                deleteError(element)
            }
        }

        if (element.name == "image") {
            console.log("IMAGEN",element.value);
            const extPermitted = ["png", "jpg", "jpeg"]
            console.log(element.value.includes("png"));
            if (element.value == ""){
                addErrorP(element)
            } else if ((element.value.includes("png") || element.value.includes("jpg" || element.value.includes("jpeg"))) == false ){
               addErrorP(element)
               document.querySelector(`.error-${element.name}`).innerText = `El archivo debe ser un formato válido (PNG, JPG O JPEG)`
            }
        }else if (element.value != "") {
            deleteError(element)
        }

    }

    inputs.forEach(input => {
        input.addEventListener("blur", function(e){
            validation(this,e)
        })
    });

})