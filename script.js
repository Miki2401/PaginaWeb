/* ==========================================
   PERFUME MIKI
   JAVASCRIPT · LUJO Y ELEGANCIA
========================================== */


/* ==========================================
   CONFIGURACIÓN
========================================== */

// IMPORTANTE:
// Escribe tu número de WhatsApp con código de país.
// Colombia: 57 + número celular.
// Ejemplo: "573001234567"

const telefono = "";


/* ==========================================
   PRODUCTOS
========================================== */

const productos = [

    {
        id: 1,
        nombre: "Sauvage Dior",
        precio: 280000
    },

    {
        id: 2,
        nombre: "Bleu de Chanel",
        precio: 320000
    },

    {
        id: 3,
        nombre: "One Million",
        precio: 250000
    },

    {
        id: 4,
        nombre: "Good Girl",
        precio: 290000
    },

    {
        id: 5,
        nombre: "La Vie Est Belle",
        precio: 270000
    },

    {
        id: 6,
        nombre: "Acqua di Gio",
        precio: 260000
    },

    {
        id: 7,
        nombre: "212 VIP",
        precio: 240000
    },

    {
        id: 8,
        nombre: "Invictus",
        precio: 230000
    },

    {
        id: 9,
        nombre: "Versace Eros",
        precio: 275000
    }

];


/* ==========================================
   CARRITO
========================================== */

let carrito = [];


// CARGAR CARRITO GUARDADO

try {

    const carritoGuardado = localStorage.getItem("perfumeMikiCarrito");

    if (carritoGuardado) {

        carrito = JSON.parse(carritoGuardado);

    }

} catch (error) {

    carrito = [];

}


/* ==========================================
   GUARDAR CARRITO
========================================== */

function guardarCarrito() {

    localStorage.setItem(
        "perfumeMikiCarrito",
        JSON.stringify(carrito)
    );

}


/* ==========================================
   AGREGAR AL CARRITO
========================================== */

function agregarCarrito(id) {

    const producto = productos.find(p => p.id === id);

    if (!producto) {

        mostrarNotificacion("Producto no encontrado.");

        return;

    }


    const productoExiste = carrito.find(p => p.id === id);


    if (productoExiste) {

        productoExiste.cantidad++;

    } else {

        carrito.push({

            ...producto,

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarCarrito();

    mostrarNotificacion(
        producto.nombre + " agregado a tu carrito ✨"
    );

}


/* ==========================================
   ACTUALIZAR CARRITO
========================================== */

function actualizarCarrito() {

    const lista = document.getElementById("lista-carrito");

    const totalHTML = document.getElementById("total");

    const contador = document.getElementById("cart-count");


    if (!lista || !totalHTML) return;


    lista.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;


    if (carrito.length === 0) {

        lista.innerHTML = `

            <p class="empty-cart">

                Aún no has elegido una fragancia.

            </p>

        `;

    }


    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;


        lista.innerHTML += `

            <div class="producto-carrito">

                <div>

                    <h3>${producto.nombre}</h3>

                    <p>
                        Precio:
                        ${formatoPrecio(producto.precio)}
                    </p>

                    <p>
                        Cantidad:
                        ${producto.cantidad}
                    </p>

                    <p>
                        Subtotal:
                        ${formatoPrecio(subtotal)}
                    </p>

                </div>

                <div class="cart-actions">

                    <button onclick="cambiarCantidad(${producto.id}, -1)">
                        −
                    </button>

                    <button onclick="cambiarCantidad(${producto.id}, 1)">
                        +
                    </button>

                    <button onclick="eliminarProducto(${producto.id})">
                        Eliminar
                    </button>

                </div>

            </div>

        `;

    });


    totalHTML.innerText = "Total: " + formatoPrecio(total);


    if (contador) {

        contador.innerText = cantidadTotal;

    }

}


/* ==========================================
   CAMBIAR CANTIDAD
========================================== */

function cambiarCantidad(id, cambio) {

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        eliminarProducto(id);

        return;

    }


    guardarCarrito();

    actualizarCarrito();

}


/* ==========================================
   ELIMINAR PRODUCTO
========================================== */

function eliminarProducto(id) {

    carrito = carrito.filter(p => p.id !== id);

    guardarCarrito();

    actualizarCarrito();

    mostrarNotificacion("Producto eliminado del carrito.");

}


/* ==========================================
   VACIAR CARRITO
========================================== */

function vaciarCarrito() {

    if (carrito.length === 0) {

        mostrarNotificacion("Tu carrito ya está vacío.");

        return;

    }


    carrito = [];

    guardarCarrito();

    actualizarCarrito();

    mostrarNotificacion("Carrito vaciado correctamente.");

}


/* ==========================================
   FINALIZAR COMPRA
========================================== */

function finalizarCompra() {

    if (carrito.length === 0) {

        mostrarNotificacion(
            "Agrega una fragancia antes de realizar tu pedido."
        );

        return;

    }


    if (!telefono) {

        mostrarNotificacion(
            "Configura tu número de WhatsApp en script.js."
        );

        return;

    }


    let total = 0;


    let mensaje =

        "✨ *PERFUME MIKI* ✨\n" +

        "Nuevo pedido de fragancias\n\n";


    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;


        mensaje +=

            "🧴 " + producto.nombre + "\n" +

            "Cantidad: " + producto.cantidad + "\n" +

            "Precio: " + formatoPrecio(producto.precio) + "\n" +

            "Subtotal: " + formatoPrecio(subtotal) + "\n\n";

    });


    mensaje +=

        "💰 *TOTAL: " + formatoPrecio(total) + "*\n\n" +

        "Hola, quiero realizar este pedido.";


    const enlace =

        "https://wa.me/" +

        telefono +

        "?text=" +

        encodeURIComponent(mensaje);


    window.open(enlace, "_blank");

}


/* ==========================================
   FORMATO DE PRECIOS
========================================== */

function formatoPrecio(valor) {

    return new Intl.NumberFormat("es-CO", {

        style: "currency",

        currency: "COP",

        maximumFractionDigits: 0

    }).format(valor);

}


/* ==========================================
   NOTIFICACIONES
========================================== */

let toastTimeout;


function mostrarNotificacion(mensaje) {

    const toast = document.getElementById("toast");

    if (!toast) return;


    toast.innerText = mensaje;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* ==========================================
   MENÚ PARA CELULARES
========================================== */

function configurarMenu() {

    const boton = document.getElementById("menu-toggle");

    const menu = document.getElementById("main-nav");


    if (!boton || !menu) return;


    boton.addEventListener("click", () => {

        const abierto = menu.classList.toggle("active");


        boton.setAttribute(
            "aria-expanded",
            abierto
        );


        boton.innerText = abierto ? "✕" : "☰";

    });


    menu.querySelectorAll("a").forEach(enlace => {

        enlace.addEventListener("click", () => {

            menu.classList.remove("active");

            boton.setAttribute("aria-expanded", "false");

            boton.innerText = "☰";

        });

    });

}


/* ==========================================
   ANIMACIONES AL DESPLAZARSE
========================================== */

function configurarAnimaciones() {

    const elementos = document.querySelectorAll(".reveal");


    if (!("IntersectionObserver" in window)) {

        elementos.forEach(elemento => {

            elemento.classList.add("visible");

        });

        return;

    }


    const observador = new IntersectionObserver(

        (entradas, observer) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                    observer.unobserve(entrada.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );


    elementos.forEach(elemento => {

        observador.observe(elemento);

    });

}


/* ==========================================
   FORMULARIO DE CONTACTO
========================================== */

function enviarFormulario(evento) {

    evento.preventDefault();


    const nombre = document.getElementById("nombre").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const mensaje = document.getElementById("mensaje").value.trim();


    if (!nombre || !correo || !mensaje) {

        mostrarNotificacion(
            "Por favor, completa todos los campos."
        );

        return;

    }


    if (!telefono) {

        mostrarNotificacion(
            "Configura tu WhatsApp para recibir mensajes."
        );

        return;

    }


    const texto =

        "Hola, soy " + nombre + ".\n\n" +

        "Correo: " + correo + "\n\n" +

        "Mensaje:\n" + mensaje;


    const enlace =

        "https://wa.me/" +

        telefono +

        "?text=" +

        encodeURIComponent(texto);


    window.open(enlace, "_blank");

}


/* ==========================================
   IR A LA TIENDA
========================================== */

function irATienda() {

    document.getElementById("tienda").scrollIntoView({

        behavior: "smooth"

    });

}


/* ==========================================
   INICIAR PÁGINA
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    actualizarCarrito();

    configurarMenu();

    configurarAnimaciones();

});
