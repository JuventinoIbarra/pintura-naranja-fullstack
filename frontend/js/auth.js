import { apiFetch } from "./api";

document.getElementById("loginForm")?.addEventListener("submit", async(e) =>{
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try{
        const data = await apiFetch("/auth/login", {
            method: "Post",
            body: JSON.stringify({email, password})
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin"){
            window.location.href("admin.html");
        }else{
            window.location.href("orders.html");
        }
    }catch(err){
        alert(err.message || "Error al iniciar sesión");
    }
});