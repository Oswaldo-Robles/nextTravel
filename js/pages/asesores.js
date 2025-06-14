
(() => {
/*     console.log("carga empleados.js"); */
    const gridTrabajadores = document.getElementById("grid-trabajadores");

    fetch(window.SERVICIOURL + "/trabajador.php")
        .then((response) => response.json())
        .then((data) => {
            data.forEach(itemEmpleado => {
                const card = `
                    <div class="col">
                        <div class="card h-100">
                            <img src="${window.SERVICIOURL}/Asesores/${itemEmpleado.foto}" class="card-img-top" alt="imagen del empleado">
                            <div class="card-body">
                                <h5 class="card-title">${itemEmpleado.nombreCompleto}</h5>
                                <p class="card-text">${itemEmpleado.cargo}</p>
                            </div>
                        </div>
                    </div>
                `;
                gridTrabajadores.innerHTML += card;
            });
        })
})();
