"use strict";

(() => {
    const listaCategorias = document.getElementById('list-categorias');
    const gripProductos = document.getElementById("grid-paquetes");
    let paquetesCategoria = [];

    fetch(window.SERVICIOURL + "/paquete/categoria.php")
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);

            data.forEach(itemCategoria => {
                const card = `
 
                <li class="list-group-item" title="${itemCategoria.descripcion}">${itemCategoria.nombre} (${itemCategoria.CantidadPaquetesCategoria})</li>

                `
                listaCategorias.innerHTML += card

            });

            selectCategorias(data);
        })

    const selectCategorias = (data) => {

        const listItem = document.querySelectorAll('#list-categorias li');

        listItem.forEach((item, index) => {
            item.addEventListener('click', () => {
                //console.log(data[index]);

                item.classList.add('active');
                listItem.forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index) {
                        otherItem.classList.remove('active');
                    }
                });

                document.getElementById("categoria-nombre").textContent = data[index].nombre;
                document.getElementById("categoria-descripcion").textContent = data[index].descripcion;
                document.getElementById("categoria-total").textContent = data[index].CantidadPaquetesCategoria;

                mostrarProductos(data[index].id_categoria);

            });
        });

        listItem[0].click(); // Simula un clic en el primer elemento para cargar los productos al inicio
    }

    const mostrarProductos = (idCategoria) => {
        fetch(window.SERVICIOURL + `/paquete/paquetesCategoria.php?idCategoria=${idCategoria}`)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                dibujarProductos(data);
                paquetesCategoria = data
            })
    }

    const dibujarProductos = (data) => {
        gripProductos.innerHTML = "";

        data.forEach(itemProducto => {

            const precioLista = Number(itemProducto.precio);
            const precioOferta = Number(itemProducto.precio_oferta);
            const precioFinal = precioOferta === 0 ? precioLista : precioOferta;

            const mostrarPrecioAnterior = precioOferta === 0 ?
                "" : `<span class="text-decoration-line-through text-secondary precio-anterior">S/.${precioLista.toFixed(2)}</span>`;

            const porcentajeDescuento = precioOferta === 0 ?
                "" : `<span class="badge bg-danger 
                ">-${Math.round((1 - (precioFinal / precioLista)) * 100)}%</span>`;

            const imagenProducto = window.SERVICIOURL + (itemProducto.url_foto ?
                itemProducto.url_foto :
                "imagenes/nofoto.jpg");

            const card = `
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="imagen-container mb-3">
                                <img src="${imagenProducto}" class="card-img-top img-producto" alt="imagen del producto">
                            </div>

                            <i class="bi bi-eye icono-vista-rapida" data-bs-toggle="modal" data-bs-target="#vista-rapida-modal"></i>

                            <div>
                                <h5 class="card-title fw-bold text-secondary">
                                    ${itemProducto.nombre}
                                    <span class="badge bg-danger fs-4 px-3 py-2">${porcentajeDescuento}</span>
                                </h5>

                                <p class="card-text mb-1 detalle-precio">
                                    <span> S/.${precioFinal.toFixed(2)}</span>
                                    <small>${mostrarPrecioAnterior}</small>
                                </p>

                                <p class="card-text text-secondary mb-0">
                                    <i class="bi bi-calendar-event"></i> Cantidad de días: ${itemProducto.duracion_dias}
                                </p>
                            </div>

                            <!-- Botón siempre al fondo -->
                            <div class="mt-auto pt-3">
                                <button class="btn btn-carrito w-100">
                                    <i class="bi bi-cart-plus"></i> Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;


            gripProductos.innerHTML += card
        });

        gripProductos.querySelectorAll('.icono-vista-rapida').forEach((iconoVistaRapida, index) => {
            iconoVistaRapida.addEventListener('click', () => mostrarProductoVistaRapida(index));

        })

        gripProductos.querySelectorAll('.imagen-container').forEach((imagenProducto, index) => {
            imagenProducto.addEventListener('click', () => mostrarDetalleProducto(index));
        });

        gripProductos.querySelectorAll('.btn-carrito').forEach((botonAgregar, index) => {
            botonAgregar.addEventListener("click", () => {
                agregarItemCarrito(paquetesCategoria[index], 1);
            });
        });



    }

    const mostrarDetalleProducto = (index) => {
        let productoSelecionadoId = paquetesCategoria[index].id_paquete;
        // Redirigir a la página de detalle del producto
        fetch("pages/productoDetalle.html")
            .then((response) => response.text())
            .then((data) => {
                mainContent.innerHTML = data
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                const script = document.createElement("script")
                script.src = "js/pages/productoDetalle.js"
                script.setAttribute("codigoProducto", productoSelecionadoId);
                mainContent.appendChild(script)
            })

    }

    const mostrarProductoVistaRapida = (index) => {
        let productoSelecionadoId = paquetesCategoria[index].id_paquete;

        console.log("Producto seleccionado para vista rápida:", productoSelecionadoId);

        fetch(window.SERVICIOURL + `/paquete/paqueteVistaRapida.php?idPaquete=${productoSelecionadoId}`)
            .then((response) => response.json())
            .then((dataDetalle) => {
                let rutaImagen = `${window.SERVICIOURL}${dataDetalle[0].url_foto}`;

                console.log(rutaImagen);

                const precioLista = Number(dataDetalle[0].precio);
                const precioOferta = Number(dataDetalle[0].precio_oferta);
                const precioFinal = precioOferta === 0 ? precioLista : precioOferta;

                const mostrarPrecioAnterior = precioOferta === 0 ?
                    "" : `<span class="text-decoration-line-through text-secondary precio-anterior">  S/.-${precioLista.toFixed(2)}</span>`;


                document.getElementById("paquete-detalle-nombre").textContent = dataDetalle[0].nombre;
                document.getElementById("paquete-detalle-imagen").setAttribute("src", rutaImagen);
                document.getElementById("paquete-detalle-descripcion").textContent = `${dataDetalle[0].descripcion}`;
                document.getElementById("paquete-detalle-dias").textContent = `${dataDetalle[0].duracion_dias}`;

                document.getElementById("paquete-detalle-personas").textContent = `${dataDetalle[0].cantidad_personas}`;

                document.getElementById("paquete-detalle-precio").innerHTML = `S/.${precioFinal.toFixed(2)} ${mostrarPrecioAnterior}`;

            })
    }


})();