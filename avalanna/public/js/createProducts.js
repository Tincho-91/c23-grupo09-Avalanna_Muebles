window.addEventListener("load", function () {

    const inputs = document.querySelectorAll("input")
    const form = document.querySelector("form")
    const pErrors = document.querySelectorAll(".erroresForm");
    const divs = document.querySelectorAll("div")
    

    const addErrorP = function(element){
        const errorP = document.createElement("p");
        errorP.classList.add(`error-${element.name}`)
        errorP.classList.add("erroresForm")
        errorP.innerText=`${element.name.toUpperCase()} no puede estar vacío`
        divs.forEach(div=>{
            const oldErrorP= document.querySelector(`error-${element.name}`)
            const rightDiv = document.querySelector(`.form_main_section-div-${element.name}`)
            oldErrorP ? rightDiv.replaceChild(errorP, oldErrorP) : rightDiv.appendChild(errorP)
        })
    }

    const validation = function(element, e){
        if (element.value == "") {
            addErrorP(element)
        }
    }

    inputs.forEach(input => {
        input.addEventListener("blur", function(e){
            validation(this,e)
        })
    });

})