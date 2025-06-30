(() => {
    let carrito = JSON.parse(sessionStorage.getItem("carritoCompra")) || [];

    // Asegurar que precio y cantidad sean números
    carrito = carrito.map(item => ({
        ...item,
        precio: Number(item.precio),
        cantidad: Number(item.cantidad)
    }));

    const tbodyCarrito = document.getElementById("tbody-carrito");
    const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
    const totalPedido = document.getElementById("total-pedido");
    const alertaVacio = document.getElementById("alerta-carrito-vacio");

    const calcularTotalCarrito = () => {
        const subtotal = carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
        totalPedido.textContent = subtotal.toFixed(2);
    };

    const habilitarEliminarItem = () => {
        tbodyCarrito.querySelectorAll(".icono-eliminar").forEach((iconoEliminar, index) => {
            iconoEliminar.addEventListener("click", () => {
                carrito.splice(index, 1);
                sessionStorage.setItem("carritoCompra", JSON.stringify(carrito));
                dibujarCarrito();
            });
        });
    };

    const habilitarCantidadItem = () => {
        tbodyCarrito.querySelectorAll(".input-cantidad").forEach((inputCantidad, index) => {
            inputCantidad.addEventListener("input", () => {
                const nuevaCantidad = parseInt(inputCantidad.value);
                if (!isNaN(nuevaCantidad) && nuevaCantidad >= 1 && nuevaCantidad <= 10) {
                    carrito[index].cantidad = nuevaCantidad;
                    sessionStorage.setItem("carritoCompra", JSON.stringify(carrito));
                    dibujarCarrito();
                }
            });
        });
    };

    const dibujarCarrito = () => {
        alertaVacio.style.display = carrito.length > 0 ? "none" : "block";
        tbodyCarrito.innerHTML = "";

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;

            const fila = `
                <tr> 
                    <td>${item.idProducto}</td>
                    <td>${item.nombre}</td>
                    <td class="text-end">S/. ${Number(item.precio).toFixed(2)}</td>
                    <td class="text-end">
                        <input type="number" class="form-control text-end input-cantidad" min="1" max="10" value="${item.cantidad}">
                    </td>
                    <td class="text-end">S/. ${Number(subtotal).toFixed(2)}</td>
                    <td class="text-center">
                        <i class="bi bi-x-circle icono-eliminar text-danger fs-5" title="Eliminar paquete"></i>
                    </td>
                </tr>`;
            tbodyCarrito.innerHTML += fila;
        });

        habilitarEliminarItem();
        habilitarCantidadItem();
        calcularTotalCarrito();
    };

    dibujarCarrito();

    btnVaciarCarrito.addEventListener("click", () => {
        carrito = [];
        sessionStorage.removeItem("carritoCompra");
        dibujarCarrito();
        totalPedido.textContent = "0.00";
    });
})();
