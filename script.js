/*
 * Script principal - Tienda de Fede
 * Manejo del DOM, Consumo de API y Lógica del Carrito
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias a elementos del DOM
    const productosContainer = document.getElementById('productos-container');
    const mensajeCarga = document.getElementById('mensaje-carga');
    const contadorCarrito = document.getElementById('contador-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoSpan = document.getElementById('total-carrito');
    const modal = document.getElementById('modal-carrito');
    const btnCerrarModal = document.querySelector('.cerrar-modal');
    const btnAbrirCarrito = document.getElementById('boton-carrito');
    const btnVaciar = document.getElementById('vaciar-carrito');
    const btnFinalizar = document.getElementById('finalizar-compra');

    // Estado inicial del carrito: recupero de LocalStorage o inicio vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Inicializo la UI del carrito al cargar la página
    actualizarCarritoUI();

    // --- 1. CONSUMO DE API ---
    // Solicito productos de la categoría 'electronics' para mantener la temática tecnológica
    const fetchProductos = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/category/electronics');
            if (!response.ok) throw new Error("Error en la conexión con la API");
            
            const data = await response.json();
            
            // Elimino mensaje de carga y renderizo
            mensajeCarga.style.display = 'none';
            renderizarProductos(data);
            
        } catch (error) {
            mensajeCarga.textContent = "Error al cargar el catálogo. Por favor intente más tarde.";
            console.error("Error fetching data:", error);
        }
    };

    fetchProductos();

    // --- 2. RENDERIZADO ---
    // Genero las tarjetas de producto dinámicamente
    function renderizarProductos(productos) {
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            card.innerHTML = `
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p class="precio">$${producto.price}</p>
                <button class="btn-agregar" 
                    data-id="${producto.id}" 
                    data-title="${producto.title}" 
                    data-price="${producto.price}">
                    Agregar
                </button>
            `;
            productosContainer.appendChild(card);
        });

        // Asigno listeners a los botones generados dinámicamente
        document.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.addEventListener('click', agregarProducto);
        });
    }

    // --- 3. GESTIÓN DEL CARRITO ---
    
    // Función para agregar item
    function agregarProducto(e) {
        const id = e.target.getAttribute('data-id');
        const title = e.target.getAttribute('data-title');
        const price = parseFloat(e.target.getAttribute('data-price'));

        // Verifico si el producto ya existe para sumar cantidad
        const productoExistente = carrito.find(prod => prod.id === id);
        
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, title, price, cantidad: 1 });
        }

        sincronizarStorage();
        // Feedback visual simple
        alert("Producto agregado al carrito");
    }

    // Función para eliminar item individual
    function eliminarProducto(e) {
        if (e.target.classList.contains('eliminar-item')) {
            const id = e.target.getAttribute('data-id');
            // Filtro el carrito excluyendo el ID seleccionado
            carrito = carrito.filter(prod => prod.id !== id);
            sincronizarStorage();
        }
    }

    // Función para vaciar todo
    function vaciarCarrito() {
        carrito = [];
        sincronizarStorage();
    }

    function finalizarCompra() {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
        } else {
            alert("¡Gracias por tu compra! Procesando pedido...");
            vaciarCarrito();
            modal.style.display = 'none';
        }
    }

    // --- 4. PERSISTENCIA Y UI ---
    
    // Guardo en LocalStorage y refresco la vista
    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoUI();
    }

    // Actualizo el HTML del modal y el contador
    function actualizarCarritoUI() {
        // Calcular total items
        const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
        contadorCarrito.textContent = totalItems;

        // Limpiar lista visual anterior
        listaCarrito.innerHTML = '';
        let totalPrecio = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<p style="text-align:center; color:#888;">Tu carrito está vacío.</p>';
        } else {
            carrito.forEach(prod => {
                totalPrecio += prod.price * prod.cantidad;
                
                const li = document.createElement('li');
                li.style.borderBottom = "1px solid #eee";
                li.style.padding = "10px 0";
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";
                
                li.innerHTML = `
                    <div style="flex-grow: 1;">
                        <strong>${prod.title.substring(0, 20)}...</strong><br>
                        <small>Cant: ${prod.cantidad} x $${prod.price}</small>
                    </div>
                    <span style="font-weight:bold;">$${(prod.price * prod.cantidad).toFixed(2)}</span>
                    <button class="eliminar-item" data-id="${prod.id}" 
                        style="background:transparent; border:none; color:red; cursor:pointer; font-size:1.2rem; margin-left:10px;">
                        &times;
                    </button>
                `;
                listaCarrito.appendChild(li);
            });
        }

        totalCarritoSpan.textContent = totalPrecio.toFixed(2);
        
        // Reasignar eventos a los botones de eliminar (ya que son nuevos en el DOM)
        document.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.addEventListener('click', eliminarProducto);
        });
    }

    // --- 5. MANEJO DEL MODAL ---
    btnAbrirCarrito.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    btnCerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    btnVaciar.addEventListener('click', vaciarCarrito);
    btnFinalizar.addEventListener('click', finalizarCompra);

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});
