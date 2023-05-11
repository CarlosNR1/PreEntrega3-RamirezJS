// Obtener elementos del DOM
const botonesAgregar = document.querySelectorAll(".agregar");
const listaProductos = document.querySelector(".lista-productos");
const botonComprar = document.querySelector("#comprar");

// Inicializar carrito
let carrito = [];

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
  // Limpiar la lista de productos en el carrito
  listaProductos.innerHTML = "";

  // Recorrer los productos en el carrito y agregarlos a la lista
  carrito.forEach((producto) => {
    const li = document.createElement("li");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    li.appendChild(imagen);

    const nombre = document.createElement("span");
    nombre.textContent = producto.nombre;
    li.appendChild(nombre);

    const precio = document.createElement("span");
    precio.textContent = `$${producto.precio}`;
    li.appendChild(precio);

    const botonBorrar = document.createElement("button");
    botonBorrar.classList.add("borrar");
    botonBorrar.textContent = "Borrar";
    botonBorrar.dataset.id = producto.id;
    li.appendChild(botonBorrar);

    listaProductos.appendChild(li);
  });

  // Actualizar el total en el DOM
  const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
  document.querySelector("#total").textContent = total;

  // Habilitar o deshabilitar botón de compra según si hay productos en el carrito
  botonComprar.disabled = carrito.length === 0;
}

// Función para agregar un producto al carrito
function agregarProducto(evento) {
  // Obtener información del producto desde los atributos data del botón
  const id = evento.target.dataset.id;
  const nombre = evento.target.dataset.nombre;
  const precio = parseInt(evento.target.dataset.precio);
  const imagen = evento.target.parentNode.querySelector("img").src;

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((producto) => producto.id === id);

  // Si el producto ya está en el carrito, aumentar la cantidad
  if (productoExistente) {
    const productoExistente = agregarProducto (producto => {
      if (producto.id === producto.id)
      productoExistente.cantidad++;
     })
    
  }
  // Si el producto no está en el carrito, agregarlo con cantidad 1
  else {
    carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
  }

  // Actualizar el carrito en el DOM
  actualizarCarrito();
}



// Función para borrar un producto del carrito
function borrarProducto(evento) {
  // Obtener el ID del producto a borrar desde el atributo data del botón
  const id = evento.target.dataset.id;

  // Buscar el índice del producto en el carrito
  const indice = carrito.findIndex((producto) => producto.id === id);

  // Si el producto está en el carrito, borrarlo
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }

  // Actualizar el carrito en el DOM
  actualizarCarrito();
}

// Asignar event listeners a los botones de agregar y borrar
botonesAgregar.forEach((boton) =>
  boton.addEventListener("click", agregarProducto)
);
listaProductos.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("agregar")) {
    agregarProducto(evento);
  }
});
listaProductos.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("borrar")) {
    borrarProducto(evento);
  }
});

// Asignar event listener al botón de compra
botonComprar.addEventListener("click", () => {
    // Preguntar al usuario por los datos de compra
    const nombre = prompt("Ingrese su nombre:");
    const tarjeta = prompt("Ingrese el número de su tarjeta de crédito:");
  
    // Enviar datos de compra al servidor (simulado)
    fetch("http://mi-servidor.com/comprar", {
      method: "POST",
      body: JSON.stringify({ nombre, tarjeta, carrito }),
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          alert("Compra realizada con éxito");
          carrito = []; // Limpiar el carrito
          actualizarCarrito(); // Actualizar el carrito en el DOM
        } else {
          throw new Error("Error en la compra");
        }
      })
      .catch((error) => alert(error));
  });
  
  // Ejemplos de optimización
  
  // Usar operador ternario en vez de condicional simple
  const precioConDescuento = precio > 100 ? precio * 0.9 : precio;
  
  // Usar operador && en vez de if para asignar valor por defecto
  const cantidad = opciones && opciones.cantidad ? opciones.cantidad : 1;
  
  // Usar operador || en vez de if para asignar valor por defecto
  const color = opciones.color || "negro";
  
  // Usar destructuring para simplificar el acceso a propiedades de objetos
  const { nombre, apellido } = usuario;
  
  // Usar spread para replicar objetos o arrays
  const productoNuevo = { ...productoExistente, cantidad: 2 };
  
  const carritoNuevo = [...carrito, productoNuevo];
  
  // Reescribir función con lógica mejorada
  function calcularTotal(carrito) {
    return carrito.reduce(
      (suma, producto) => suma + producto.precio * producto.cantidad,
      0
    );
  }
  
