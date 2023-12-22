// PRODUCTOS
const productos = [
    {
        id: "arbol-01",
        titulo: "Arbol Grande",
        imagen: "./Productos/arboles/01.jpg",
        categoria: {
            nombre: "Arboles",
            id: "arboles"
        },
        precio: 1000
    },
    {
        id: "arbol-02",
        titulo: "Arbol Mediano",
        imagen: "./Productos/arboles/02.jpg",
        categoria: {
            nombre: "Arboles",
            id: "arboles"
        },
        precio: 1000
    },
    {
        id: "arbol-03",
        titulo: "Arbol Pequeño",
        imagen: "./Productos/arboles/03.jpg",
        categoria: {
            nombre: "Arboles",
            id: "arboles"
        },
        precio: 1000
    },
    {
        id: "decorado-01",
        titulo: "Arbol Dorado",
        imagen: "./Productos/decorados/01.jpg",
        categoria: {
            nombre: "Arboles Decorados",
            id: "decorados"
        },
        precio: 1000
    },
    {
        id: "decorado-02",
        titulo: "Arbol Rosa",
        imagen: "./Productos/decorados/02.jpg",
        categoria: {
            nombre: "Arboles Decorados",
            id: "decorados"
        },
        precio: 1000
    },
    {
        id: "decorado-03",
        titulo: "Arbol Azul",
        imagen: "./Productos/decorados/03.jpg",
        categoria: {
            nombre: "Arboles Decorados",
            id: "decorados"
        },
        precio: 1000
    },
    {
        id: "adorno-01",
        titulo: "Bolas de Navidad",
        imagen: "./Productos/adornos/01.jpg",
        categoria: {
            nombre: "Adornos",
            id: "adorno"
        },
        precio: 1000
    },
    {
        id: "adorno-02",
        titulo: "Lazos",
        imagen: "./Productos/adornos/02.jpg",
        categoria: {
            nombre: "Adornos",
            id: "adorno"
        },
        precio: 1000
    },
    {
        id: "adorno-03",
        titulo: "Guirnaldas",
        imagen: "./Productos/adornos/03.jpg",
        categoria: {
            nombre: "Adornos",
            id: "adorno"
        },
        precio: 1000
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}