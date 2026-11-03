/* ==================================
MENSAJE DE BIENVENIDA
================================== */

function mostrarMensaje() {

alert("¡Bienvenido a Perfume Miki!");

}

/* ==================================
IR A LA TIENDA
================================== */

function irATienda() {

document.getElementById("tienda").scrollIntoView({
    behavior: "smooth"
});

}

/* ==================================
PRODUCTOS DE LA TIENDA
================================== */

const productos = [

{
    id: 1,
    nombre: "Elegance",
    precio: 120000
},

{
    id: 2,
    nombre: "Intense",
    precio: 150000
},

{
    id: 3,
    nombre: "Exclusive",
    precio: 180000
}

];

/* ==================================
CARRITO DE COMPRAS
================================== */

let carrito = [];

// AGREGAR PRODUCTOS

function agregarCarrito(id) {

let producto = productos.find(p => p.id === id);

let productoExiste = carrito.find(p => p.id === id);

if (productoExiste) {

    productoExiste.cantidad++;

} else {

    carrito.push({
        ...producto,
        cantidad: 1
    });

}

actualizarCarrito();

alert(producto.nombre + " agregado al carrito.");

}

// ACTUALIZAR CARRITO

function actualizarCarrito() {

let lista = document.getElementById("lista-carrito");

let totalHTML = document.getElementById("total");

lista.innerHTML = "";

let total = 0;

if (carrito.length === 0) {

    lista.innerHTML = `
        <p class="texto-centro">
            Tu carrito está vacío.
        </p>
    `;

}

carrito.forEach(producto => {

    let subtotal = producto.precio * producto.cantidad;

    total += subtotal;

    lista.innerHTML += `

        <div class="producto-carrito">

            <div>

                <h3>${producto.nombre}</h3>

                <p>
                    Precio: ${formatoPrecio(producto.precio)}
                </p>

                <p>
                    Cantidad: ${producto.cantidad}
                </p>

                <p>
                    Subtotal: ${formatoPrecio(subtotal)}
                </p>

            </div>

            <button onclick="eliminarProducto(${producto.id})">

                Eliminar

            </button>

        </div>

    `;

});

totalHTML.innerText = "Total: " + formatoPrecio(total);

}

// ELIMINAR PRODUCTO

function eliminarProducto(id) {

carrito = carrito.filter(p => p.id !== id);

actualizarCarrito();

}

// VACIAR CARRITO

function vaciarCarrito() {

if (carrito.length === 0) {

    alert("El carrito ya está vacío.");

    return;

}

carrito = [];

actualizarCarrito();

alert("El carrito ha sido vaciado.");

}

// FINALIZAR COMPRA

function finalizarCompra() {

if (carrito.length === 0) {

    alert("Primero debes agregar productos al carrito.");

    return;

}

let total = carrito.reduce((suma, producto) => {

    return suma + producto.precio * producto.cantidad;

}, 0);

alert(
    "¡Gracias por comprar en Perfume Miki!\n\n" +
    "Total de tu compra: " + formatoPrecio(total) +
    "\n\nTu pedido ha sido registrado."
);

carrito = [];

actualizarCarrito();

}

// FORMATO DE PRECIOS

function formatoPrecio(valor) {

return new Intl.NumberFormat("es-CO", {

    style: "currency",

    currency: "COP",

    maximumFractionDigits: 0

}).format(valor);

}

/* ==================================
CALCULADORA
================================== */

function obtenerNumeros() {

let numero1 = parseFloat(
    document.getElementById("numero1").value
);

let numero2 = parseFloat(
    document.getElementById("numero2").value
);

return [numero1, numero2];

}

function sumar() {

let numeros = obtenerNumeros();

mostrarResultado(numeros[0] + numeros[1]);

}

function restar() {

let numeros = obtenerNumeros();

mostrarResultado(numeros[0] - numeros[1]);

}

function multiplicar() {

let numeros = obtenerNumeros();

mostrarResultado(numeros[0] * numeros[1]);

}

function dividir() {

let numeros = obtenerNumeros();

if (numeros[1] === 0) {

    alert("No es posible dividir entre cero.");

    return;

}

mostrarResultado(numeros[0] / numeros[1]);

}

function mostrarResultado(resultado) {

if (Number.isNaN(resultado)) {

    alert("Por favor, ingresa los dos números.");

    return;

}

document.getElementById("resultado").innerText =
    "Resultado: " + resultado;

}

/* ==================================
GALERÍA
================================== */

function ampliarImagen(imagen) {

if (imagen.style.transform === "scale(1.5)") {

    imagen.style.transform = "scale(1)";

} else {

    imagen.style.transform = "scale(1.5)";

}

}

/* ==================================
FORMULARIO DE CONTACTO
================================== */

function enviarFormulario(evento) {

evento.preventDefault();

let nombre = document.getElementById("nombre").value;

let correo = document.getElementById("correo").value;

let mensaje = document.getElementById("mensaje").value;

alert(
    "Gracias " + nombre +
    ". Hemos recibido tu mensaje."
);

console.log("Nombre:", nombre);

console.log("Correo:", correo);

console.log("Mensaje:", mensaje);

}

