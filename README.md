# Tienda de Fede - E-commerce de Tecnología 📱💻

**Proyecto Final Integrador** desarrollado para el curso de **Front-End JS** en Talento Tech.

## 👨‍💻 Datos del Desarrollador
* **Nombre:** Federico Tortolero
* **Comisión:** C25226
* **Rol:** Front-End Developer Trainee

## 📝 Descripción del Proyecto
Desarrollé una aplicación web tipo SPA (Single Page Application) simulando una tienda de tecnología especializada en equipos premium y reacondicionados. El objetivo fue integrar el consumo de datos externos con una experiencia de usuario fluida y persistente.

Para el catálogo, decidí consumir la categoría `electronics` de la **FakeStoreAPI**, lo que me permitió trabajar con datos reales (imágenes, precios, títulos) en lugar de datos estáticos "hardcodeados".

## 🚀 Funcionalidades Implementadas

### 1. Conexión con API REST (Fetch)
Implementé una función asíncrona (`async/await`) para consumir datos desde `https://fakestoreapi.com/products/category/electronics`. Manejé los posibles errores de red mediante bloques `try/catch` para informar al usuario si el servicio no está disponible.

### 2. Gestión del Estado (Carrito de Compras)
Desarrollé la lógica completa del carrito utilizando JavaScript Vanilla:
* **Agregar:** Verifica si el producto ya existe para sumar cantidad o crea un nuevo objeto.
* **Eliminar:** Permite quitar items individuales.
* **Cálculo:** Suma dinámica de precios totales.
* **Contador:** Indicador visual en el header que muestra la cantidad de items.

### 3. Persistencia de Datos (LocalStorage)
Para mejorar la UX, implementé `localStorage`. Esto permite que, si el usuario recarga la página o cierra el navegador, su carrito de compras no se pierda, recuperando el estado al iniciar la aplicación.

### 4. Interfaz de Usuario (UI/UX)
* Diseñé una interfaz minimalista inspirada en el ecosistema Apple.
* Utilicé **CSS Grid** para la grilla de productos, asegurando que sea totalmente responsiva.
* Implementé un **Modal** para el carrito en lugar de una página separada, para una navegación más rápida.

### 5. Formulario de Contacto
Creé una sección de contacto funcional integrada con el servicio **Formspree** para la recepción real de mensajes vía email.

## 🛠️ Stack Tecnológico
* **HTML5:** Estructura semántica.
* **CSS3:** Variables CSS, Flexbox, Grid, Media Queries, Backdrop-filter.
* **JavaScript (ES6+):** Fetch API, DOM Manipulation, JSON parsing, Event Listeners.
* **Control de Versiones:** Git.

## 📦 Instalación y Uso
1. Clonar o descargar este repositorio.
2. Abrir el archivo `index.html` en cualquier navegador moderno.
3. No requiere instalación de dependencias (Node.js) ya que es JavaScript Vanilla puro.

---
© 2025 Federico Tortolero.
