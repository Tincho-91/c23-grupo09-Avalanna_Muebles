window.addEventListener("load", function () {

    const inputs = document.querySelectorAll("input")

    const divs = document.querySelectorAll("div")
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
        
        if (element.name == "nameAndSurname") {
            if (element.value == ""){
                addErrorP(element)
            } else if (!min(element.value, 2)) {
                console.log("EL ACT Y MIN IM PERM",min(element.value, 2));
                addErrorP(element)
                const labelContent = document.querySelector(`.form_main_section-div-${element.name} label`).textContent
                document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" Deberá tener al menos 2 caracteres.`
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
                } else {
                  
                    
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
                console.log("minimo 8 maximo 10",min(element.value, 8));
                 document.querySelector(`.error-${element.name}`).innerText = `"${labelContent.toUpperCase()}" debe tener un mínimo de 8 caracteres y un maximo de 12 caracteres`

            }
        }
       

        if (element.name == "image") {
            if (element.value == ""){
                addErrorP(element)
            } else if ((element.value.includes("png") || element.value.includes("jpg" || element.value.includes("jpeg"))) == false ){
               addErrorP(element)
               document.querySelector(`.error-${element.name}`).innerText = `El archivo debe ser un formato válido (PNG, JPG O JPEG)`
            }else if(element.value != ""){
                deleteError(element)
            }
        }

       }

    inputs.forEach(input => {
        input.addEventListener("blur", function(e){
            validation(this)
        })
    });
   

    button.addEventListener("click", function(e){
        let errorValidate;

        inputs.forEach(input=>{

            if(input != document.querySelector(".search")){
                if (document.querySelector(`.form_main_section-div-${input.name} p`).textContent.length > 0) {
                    errorValidate = true;
                    
                }
            }
           
        })

        if (errorValidate) {
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

