window.addEventListener("load", function () {
    
    const inputs = document.querySelectorAll("input")
    const form = document.querySelector("form")
    const pErrors = document.querySelectorAll(".erroresForm");
    const divs = document.querySelectorAll("div")
    const select = document.querySelector("select")
    const button = document.querySelector(".form-button")
    

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

    /*const min = function (value, num){
        return value.length >= num
    }*/
    const minAndMax = function(value, min, max){
        return value.length >= min && value.length <= max
    }

    const validation = function(element){
        if (element.value == "") {
            console.log("element", element.value);
            addErrorP(element)
        }else{
            deleteError(element)
        }
        
        if (element.name == "name") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!minAndMax(element.value, 5, 50)) {
                console.log("ACA",min(element.value, 5));
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 5 caracteres y un máximo de 50.`
            }else{
                deleteError(element)
            }
        }

        if (element.name == "description") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!minAndMax(element.value, 20, 250)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 20 caracteres y un máximo de 250.`
            } else {
                deleteError(element)
            }
        }

        if (element.name == "extraDescription") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!minAndMax(element.value, 10,250)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 10 caracteres y un máximo de 250.`
            }else{
                deleteError(element)
            }
        }

        if (element.name == "image") {
            const extPermitted = ["png", "jpg", "jpeg"]
            if (element.value == ""){
                addErrorP(element)
            } else if ((element.value.includes("png") || element.value.includes("jpg" || element.value.includes("jpeg"))) == false ){
               addErrorP(element)
               document.querySelector(`.error-${element.name}`).innerText = `El archivo debe ser un formato válido (PNG, JPG O JPEG)`
            }else if(element.value != ""){
                deleteError(element)
            }
        }

        if (element.name == "discount" || element.name == "price") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!Number.isInteger(parseInt(element.value))) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe ser un número.`
            }else{
                deleteError(element)
            }
           
        }

        if (element.name == "height" || element.name =="width" || element.name == "depth") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!minAndMax(element.value, 3, 10)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 3 caracteres y un máximo de 10.`
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
    

    button.addEventListener("click", function(e){
        let errorValidate;

        inputs.forEach(input=>{

            if(input != document.querySelector(".search")){
                if (document.querySelector(`.form_main_section-div-${input.name} p`).textContent.length > 0) {
                    errorValidate = true;
                    
                }
            }
           
        })
        console.log("ERROR VALIDATE", errorValidate);

        if (errorValidate) {
            e.preventDefault()
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe completar el formulario con los datos indicados",
                footer: ''
              });

        }if (errorValidate) {
            e.preventDefault()
            
            Swal.fire({
                customClass: {
                    confirmButton: 'swalBtnColor',
                  },
                icon: "error",
                title: "Oops...",
                text: "Debe completar el formulario con los datos indicados",
                footer: '',
              
              });
            document.querySelector(".swalBtnColor").style.backgroundColor = "black"
              
        }
        
    })
})