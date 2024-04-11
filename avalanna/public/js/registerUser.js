window.addEventListener("load", async function () {

    const users = await fetch("http://localhost:3000/api/users/all").then(resp=>{
        return resp.json()
    })
    console.log("users", users);
    const checkEmail = function(element, users){
        let emailUser = ""
        users.forEach(user => {
            if (element.value == user.email) {
                emailUser = user.email
            }
        });

        return emailUser.length > 1
    }
   

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
        
        if (element.name == "NameAndSurname") {
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

        if (element.name == "email") {
            if (element.value == "") {
                addErrorP(element);
            } else {
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(element.value)) {
                    addErrorP(element);
                    document.querySelector(`.error-${element.name}`).innerText = "El formato de correo electrónico no es válido";
                } else if(checkEmail(element, users)){
                    addErrorP(element);
                    document.querySelector(`.error-${element.name}`).innerText = "Este correo electrónico ya se encuentra registrado";
                }else { 
                 deleteError(element);
                }
            }
        }

        if (element.name == "phoneNumber") {
            if (element.value == "") {
                addErrorP(element);
                
            } else if (!Number.isInteger(parseInt(element.value))) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe ser un número`
            
            } else if (!(element.value.length>=8 && element.value.length<=12)) {
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                 document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 8 caracteres y un maximo de 12 caracteres`

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
        input.addEventListener("blur", function(){
            validation(this)
        })
    });
})