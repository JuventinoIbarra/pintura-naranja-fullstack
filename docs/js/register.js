document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const errorDiv = document.getElementById("error");
    errorDiv.textContent = "";

    if (password.length < 6) {
        errorDiv.textContent = "La contraseña debe tener al menos 6 caracteres";
        return;
    }

    try {
        await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        alert("Usuario registrado correctamente");
        window.location.href = "login.html";

    } catch (error) {
        errorDiv.textContent = error.message || "Error al registrarse";
    }
});
