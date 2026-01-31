export function requireAuth(role = null){
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        window.location.href = "login.html";
    }

    if (role && user.role !== role){
        alert("No tienes permisos");
        window.location.href = "index.html";
    }
}