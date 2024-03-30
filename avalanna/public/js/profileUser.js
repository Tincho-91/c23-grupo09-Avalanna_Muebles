window.addEventListener("load", function () {
    
    // Código de validación del formulario
    document.getElementById("updateForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Validación de campos
        var nameAndSurname = document.getElementById("nameAndSurname").value;
        var email = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var birthday = document.getElementById("date").value;

        // Validar nombre y apellido
        if (nameAndSurname.trim().length < 2) {
            alert("El nombre y apellido deben tener al menos 2 caracteres");
            return;
        }

        // Validar email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Debe ingresar un formato de email válido");
            return;
        }

        // Validar número de teléfono
        if (phoneNumber.trim() === "") {
            alert("El número de teléfono es obligatorio");
            return;
        }

        // Validar fecha de nacimiento
        if (birthday.trim() === "") {
            alert("La fecha de nacimiento es obligatoria");
            return;
        }

        // Si pasa todas las validaciones, enviar el formulario
        this.submit();
    });
});
