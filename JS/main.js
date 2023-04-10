//AGREGANDO PRODUCTOS

const productos = [
    //tacones
    {
        id: "tacones-01",
        titulo: "Tacones 01",
        imagen: "./IMG/tacones/Tacones 01.jpeg",
        categoria: {
            nombre: "Tacones",
            id: "tacones"
        },
        precio: 500
    },
    {
        id: "tacones-02",
        titulo: "Tacones 02",
        imagen: "./IMG/tacones/Tacones 02.jpeg",
        categoria: {
            nombre: "Tacones",
            id: "tacones"
        },
        precio: 500
    },
    //SANDALIAS
    {
        id: "sandalias-01",
        titulo: "Alpargatas 01",
        imagen: "./IMG/alpargatasandalias/Alpargatas 01.jpeg",
        categoria: {
            nombre: "Sandalias",
            id: "sandalias"
        },
        precio: 520
    },
    {
        id: "sandalias-02",
        titulo: "Sandalias 02",
        imagen: "./IMG/alpargatasandalias/Sandalias 01.jpeg",
        categoria: {
            nombre: "Sandalias",
            id: "sandalias"
        },
        precio: 430
    },
    //ZAPATILLAS
    {
        id: "zapatillas-01",
        titulo: "Mules 01",
        imagen: "./IMG/mulesloafers/Mules 01.jpeg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 440
    },
    {
        id: "zapatillas-02",
        titulo: "Loafers 02",
        imagen: "./IMG/mulesloafers/Loafers 01.jpeg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 510
    },
    //TENIS
    {
        id: "tenis-01",
        titulo: "Tenis 01",
        imagen: "./IMG/tenis/Tenis 01.jpeg",
        categoria: {
            nombre: "Tenis",
            id: "tenis"
        },
        precio: 500
    },
    {
        id: "tenis-02",
        titulo: "Tenis 02",
        imagen: "./IMG/tenis/Tenis 02.jpeg",
        categoria: {
            nombre: "Tenis",
            id: "tenis"
        },
        precio: 498
    },
];

//Elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    //Vaciamos contenedor para que no se duplique al momento de elegir una sección del menú
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id= "${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);

        actualizarBotonesAgregar()
    })
}

cargarProductos(productos);

//
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            //Array para filtrar la selección del menú
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});

/*Agregar entradas al carrito*/

//Actualizamos botones de agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    //creamos producto para agregarlo al carrito cuando se de un click en el boton agregar
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        //Si el producto existe en el carrito se agregara la nueva cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
}

//Actualizar el número del carrito al agregar productos
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}