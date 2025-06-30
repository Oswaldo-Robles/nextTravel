

fetch( window.SERVICIOURL+"/destinos.php")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.map((destino) => {
            console.log(destino.nombre);
            let fila = "<tr><td>" + destino.id_destino + "</td><td>" + destino.nombre
                  + "</td><td>" + destino.clima + "</td><td>" + destino.descripcion + "</td></tr>"

            document.getElementById("tbody-envios").innerHTML += fila
            
        })
    })
