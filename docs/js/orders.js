// Cargar productos
async function loadProducts() {
    try {
        const products = await apiFetch("/products");

        const container = document.getElementById("products");
        container.innerHTML = "";

        products.forEach(p => {
            container.innerHTML += `
                <div>
                    <label>
                        <input type="checkbox" data-id="${p._id}">
                        <strong>${p.name}</strong> - $${p.price}
                    </label>
                    <input type="number" min="1" value="1" data-qty="${p._id}">
                </div>
        `;
    });
    } catch (error) {
        console.error(error);
        alert("Error al cargar productos");
    }
}

// Crear pedido
document.getElementById("createOrder").addEventListener("click", createOrder);

async function createOrder() {
    const selected = document.querySelectorAll("input[type='checkbox']:checked");
    

    if (selected.length === 0) {
        alert("Selecciona al menos un producto");
        return;
    }

    const products = [];

    selected.forEach(cb => {
        const id = cb.dataset.id;
        const qtyInput = document.querySelector(`input[data-qty="${id}"]`);
        const quantity = Number(qtyInput.value);

        products.push({
            product: id,
            quantity
        });
    });

    try {
        const order = await apiFetch("/orders", {
            method:"POST",
            body: JSON.stringify({products})
        });
        alert("Pedido creado correctamente");
        console.log("Pedido Creado", order);

        await loadMyOrders();
    } catch (error) {
        console.error(error);
        alert("Error al crear pedido");
    }
}


// Cargar mis pedidos
document.addEventListener("DOMContentLoaded", loadMyOrders);

async function loadMyOrders() {
    try {
        const orders = await apiFetch("/orders/my");
        console.log("MIS PEDIDOS:", orders);

        renderOrders(orders);
    } catch (error) {
        console.error(error);
        alert("Error al cargar pedidos");
    }
    }

function renderOrders(orders) {
    const container = document.getElementById("ordersList");

    if (!container) return;
    container.innerHTML = "";

    if (orders.length === 0) {
        container.innerHTML = "<p>No tienes pedidos aún</p>";
        return;
    }

    orders.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-card");

        let productsHTML = "";

        order.products.forEach(item => {
        productsHTML += `
            <li>
            ${item.product.name} —
            $${item.product.price} x ${item.quantity}
            </li>
        `;
        });

        orderDiv.innerHTML = `
        <h4>Pedido #${order._id}</h4>
        <p><strong>Estado:</strong> ${order.status}</p>

        <p><strong>Productos:</strong></p>
        <ul>
            ${productsHTML}
        </ul>

        <p><strong>Total:</strong> $${order.total}</p>
        <hr>
        `;

        container.appendChild(orderDiv);
    });
}


loadProducts();
