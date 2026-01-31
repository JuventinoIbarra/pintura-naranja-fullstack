const API_URL = "https://pintura-naranja-backend.onrender.com/api";

async function apiFetch(endpoint, options={}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };


    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`,{
        ...options,
        headers
    });

    const data = await response.json();
    
    if(!response.ok){
        throw data;
    }

    return data;
}