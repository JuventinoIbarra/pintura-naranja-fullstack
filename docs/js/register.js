document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorDiv = document.getElementById("error");

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    errorDiv.textContent = "";

    // PRUEBA DE ORO
    console.log("VALORES:", { nombre, email, password });

    if (!nombre) {
        errorDiv.textContent = "El nombre es obligatorio";
        return;
    }

    try {
        await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                nombre,
                email,
                password
            })
        });

        alert("Usuario registrado correctamente");
        window.location.href = "login.html";
    } catch (err) {
        console.error(err);
        errorDiv.textContent = err.message || "Error al registrar usuario";
    }
});
