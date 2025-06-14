"use strict";
(() => {
    const scriptElement = document.currentScript;
    const idproducto = scriptElement.getAttribute("codigoProducto");

    fetch(window.SERVICIOURL + "/paquete/paqueteVistaDetalle.php?idPaquete=" + idproducto)
        .then(response => response.json())
        .then(dataDetalle => {
            console.log(dataDetalle);


            let rutaImagen = `${window.SERVICIOURL}${dataDetalle[0].url_foto}`;

            console.log(rutaImagen);

            const precioLista = Number(dataDetalle[0].precio);
            const precioOferta = Number(dataDetalle[0].precio_oferta);
            const precioFinal = precioOferta === 0 ? precioLista : precioOferta;

            const mostrarPrecioAnterior = precioOferta === 0 ?
                "" : `<span class="text-decoration-line-through text-secondary precio-anterior">  S/.-${precioLista.toFixed(2)}</span>`;

            document.getElementById("paquete-detalle-precio").innerHTML = `S/.${precioFinal.toFixed(2)} ${mostrarPrecioAnterior}`;

            document.getElementById("paquete-detalle-imagen").setAttribute("src", rutaImagen);

            document.getElementById("paquete-detalle-descripcionLarga").innerHTML=dataDetalle[0].descripcionLarga;

            document.getElementById("paquete-detalle-nombre").textContent = dataDetalle[0].nombre;

            document.getElementById("paquete-detalle-categoria").textContent = dataDetalle[0].Categoria;

            document.getElementById("paquete-detalle-dias").textContent = dataDetalle[0].duracion_dias;

            document.getElementById("paquete-detalle-personas").textContent = dataDetalle[0].cantidad_personas;

            document.getElementById("paquete-detalle-fpartida").textContent = dataDetalle[0].fecha_inicio;

            document.getElementById("paquete-detalle-fvuela").textContent = dataDetalle[0].fecha_fin;

            document.getElementById("paquete-detalle-descripcion").textContent = dataDetalle[0].descripcion;



            /*             document.getElementById("producto-detalle-detalle").textContent = `${dataDetalle[0].detalle}`;
                        document.getElementById("producto-detalle-stock").textContent = `${dataDetalle[0].unidadesenexistencia}`;
                        document.getElementById("producto-detalle-precio").innerHTML = `S/.${precioFinal.toFixed(2)} ${mostrarPrecioAnterior}`;
                        document.getElementById("producto-detalle-categoria").textContent = `${dataDetalle[0].categoria}`;
                        document.getElementById("producto-detalle-pais").textContent = `${dataDetalle[0].pais}`;
                        document.getElementById("producto-detalle-proveedor").textContent = `${dataDetalle[0].Proveedor}`;
                        document.getElementById("producto-detalle-atencion").textContent = `${dataDetalle[0].telefono}`;
                        document.getElementById("producto-detalle-descripcion").innerHTML = `${dataDetalle[0].descripcion}`; */
        })

})()