(() => {
    const tbodyHotel = document.getElementById("tbody-hotel");
    const formInsert = document.getElementById("form-insert");
    const formUpdate = document.getElementById("form-update");

    const dibujarHoteles = () => {
        fetch(window.SERVICIOURL + `/Hotel/hotel.php`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                tbodyHotel.innerHTML = "";

                data.map(item => {
                    const fila = `
                <tr> 
                    <td>${item.idHotel}</td>
                    <td>${item.nombreHotel}</td>
                    <td>${item.departamento}</td>
                    <td>${item.precioNoche}</td>
                    <td>${item.descripcion}</td>
                    <td> <i class="bi bi-pencil icono-editar" title="editar director" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-Update"> </i> </td>
                    <td> <i class="bi bi-x-square icono-eliminar" title="eliminar director"> </i> </td>
                </tr>
                `
                    tbodyHotel.innerHTML += fila
                })

                tbodyHotel.querySelectorAll(".icono-editar").forEach((iconoEditar, index) => {
                    iconoEditar.addEventListener("click", () => {
                        document.getElementById("updateIdHotel").value = data[index].idHotel;
                        document.getElementById("updateNombreHotel").value = data[index].nombreHotel;
                        document.getElementById("updateDepartamento").value = data[index].departamento;
                        document.getElementById("updatePrecioNoche").value = data[index].precioNoche;
                        document.getElementById("updateDescripcion").value = data[index].descripcion;
                    })
                })
            })
    }
    dibujarHoteles();

    const insertHotel = (event) => {
        event.preventDefault();
        const formData = new FormData(formInsert);

        fetch(window.SERVICIOURL + `/Hotel/hotelInsert.php`, {
                method: "POST",
                body: formData
            })
            .then((response) => response.text())
            .then(data => {
                console.log(data);
                dibujarHoteles();
                formInsert.reset();
                document.querySelector("#offcanvas-Read .btn-close").click();

            })
    }

    const updateHotel = (event) => {
        event.preventDefault();
        const formData = new FormData(formUpdate);

        fetch(window.SERVICIOURL + `/Hotel/hotelUpdate.php`, {
                method: "POST",
                body: formData
            })
            .then((response) => response.text())
            .then(data => {
                console.log(data);
                dibujarHoteles();
                formUpdate.reset();
                document.querySelector("#offcanvas-Update .btn-close").click();
            })
    }

    formInsert.addEventListener("submit", (event) =>
        insertHotel(event)
    );

    formUpdate.addEventListener("submit", (event) =>
        updateHotel(event)
    );

})()