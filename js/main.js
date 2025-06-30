"use strict";

window.SERVICIOURL = "https://ecotasty.store/apiNextTravel";

const menuMain = document.getElementById("menu-main");
const mainContent = document.getElementById("main-content");
const menuRight = document.getElementById("menu-rigth");
const logoNavbarBrand = document.getElementById("logo-navbar-brand");

const menuData = [{
        label: "Sobre nosotros",
        submenu: [{
                label: "Nosotros",
                url: "pages/nosotros.html",
                script: "js/pages/nosotros.js",
            },
            {
                label: "Asesores",
                url: "pages/asesores.html",
                script: "js/pages/asesores.js",
            },
            {
                label: "Locales",
                url: "pages/locales.html",
                script: "js/pages/locales.js",
            },
        ],
    },

    {
        label: "Hotel",
        url: "pages/hotel.html",
        script: "js/pages/hotel.js"
    },
    {
        label: "Paquetes",
        url: "pages/paquetes.html",
        script: "js/pages/paquetes.js",
    },
    {
        label: "Vuelos",
        url: "pages/vuelos.html",
        script: "js/pages/vuelos.js"
    },
    {
        label: "Contáctanos",
        url: "pages/contactanos.html",
        script: "js/pages/contactanos.js",
    },
];

const menuRightData = [
    {
        label: "Carrito",
        url: "pages/carrito.html",
        script: "js/pages/carrito.js",
        icon: "bi bi-cart"
    },
    {
        label: "Iniciar sesión",
        url: "pages/iniciarSesion.html",
        script: "js/pages/iniciarSesion.js",
        icon: "bi bi-person-circle"
    }
];

menuRightData.forEach((item) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    const link = document.createElement("a");
    link.className = "nav-link";
    link.href = "#";
    link.innerHTML = `${item.icon ? `<i class="${item.icon}"></i> ` : ""}${item.label}`;
    
    link.addEventListener("click", (e) => {
        e.preventDefault();
        loadPage(item.url, item.script);
    });

    li.appendChild(link);
    menuRight.appendChild(li);
});

menuData.forEach((itemMenu) => {
    const liMenu = document.createElement("li");

    // Si tiene submenu, renderiza como dropdown
    if (itemMenu.submenu) {
        liMenu.className = "nav-item dropdown";
        const link = document.createElement("a");
        link.className = "nav-link dropdown-toggle";
        link.href = "#";
        link.setAttribute("role", "button");
        link.setAttribute("data-bs-toggle", "dropdown");
        link.innerText = itemMenu.label;

        const dropdownMenu = document.createElement("ul");
        dropdownMenu.className = "dropdown-menu";

        itemMenu.submenu.forEach((subItem) => {
            const dropdownItem = document.createElement("li");
            const a = document.createElement("a");
            a.className = "dropdown-item";
            a.href = "#";
            a.innerText = subItem.label;
            a.addEventListener("click", (e) => {
                e.preventDefault();
                loadPage(subItem.url, subItem.script);
                activarLink(a);
            });
            dropdownItem.appendChild(a);
            dropdownMenu.appendChild(dropdownItem);
        });

        liMenu.appendChild(link);
        liMenu.appendChild(dropdownMenu);

        link.addEventListener("click", (e) => {
            activarLink(link);
        });
    } else {
        liMenu.className = "nav-item";
        const link = document.createElement("a");
        link.className = "nav-link";
        link.href = "#";
        link.innerText = itemMenu.label;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            loadPage(itemMenu.url, itemMenu.script);
            activarLink(link);
        });
        liMenu.appendChild(link);
    }
    menuMain.appendChild(liMenu);
});

const loadPage = (itemUrl, itemScript) => {
    fetch(itemUrl)
        .then((response) => response.text())
        .then((data) => {
            mainContent.innerHTML = data;

            window.scrollTo({ top: 0, behavior: "smooth" });

            if (itemScript) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = itemScript;
                mainContent.appendChild(script);
            }
        });
};

const activarLink = (link) => {
    menuMain
        .querySelectorAll("a.nav-link, a.dropdown-item")
        .forEach((a) => a.classList.remove("active"));
    link.classList.add("active");

    if (link.classList.contains("dropdown-item")) {
        let parentDropdown = link
            .closest(".dropdown")
            .querySelector(".dropdown-toggle");
        if (parentDropdown) parentDropdown.classList.add("active");
    }
};

const agregarItemCarrito = (itemProducto, cantidad) => {
    const precioFinal = itemProducto.precio_oferta === 0 ? itemProducto.precio : itemProducto.precio_oferta;

    const nuevoItem = {
        idProducto: itemProducto.id_paquete,
        nombre: itemProducto.nombre,
        precio: precioFinal,
        cantidad: cantidad,
    };

    const carrito = JSON.parse(sessionStorage.getItem("carritoCompra")) || [];
    const index = carrito.findIndex(item => item.idProducto === nuevoItem.idProducto);

    if (index !== -1) {
        carrito[index].cantidad += nuevoItem.cantidad;
    } else {
        carrito.push(nuevoItem);
    }

    sessionStorage.setItem("carritoCompra", JSON.stringify(carrito));
};


logoNavbarBrand.addEventListener("click", () => {
    loadPage("pages/home.html", "js/pages/home.js");
});

logoNavbarBrand.click();

const setUpNavbarScrollEffect = (
    navbarSelector = ".glass-navbar",
    scrollValue = 10,
    logoSelector = "#logo-navbar-img",
    logoDefault = "assets/img/logo-blanco.png",
    logoScrolled = "assets/img/logo-color.png"
) => {
    const navbar = document.querySelector(navbarSelector);
    const logo = document.querySelector(logoSelector);
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > scrollValue) {
            navbar.classList.add("scrolled");
            if (logo) logo.src = logoScrolled;
        } else {
            navbar.classList.remove("scrolled");
            if (logo) logo.src = logoDefault;
        }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
};

document.addEventListener("DOMContentLoaded", () => {
    setUpNavbarScrollEffect(
        ".glass-navbar",
        10,
        "#logo-navbar-img",
        "assets/img/logo-blanco.png", // Cambia por el logo de fondo oscuro
        "assets/img/logo-color.png" // Cambia por el logo de fondo claro
    );
});