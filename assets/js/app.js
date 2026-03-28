let categoriaActual = "Todos";
let textoBusqueda = "";

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

/* =========================
   INICIO
========================= */
function iniciarApp() {
  cargarComponentes();
  renderizarProductos();

  // esperar carga de header
  setTimeout(() => {
    iniciarBuscador();

    if (typeof actualizarCarrito === "function") {
      actualizarCarrito();
    }
  }, 300);
}

/* =========================
   BUSCADOR 🔍
========================= */
function iniciarBuscador() {
  const input = document.getElementById("inputBusqueda");
  if (!input) return;

  input.addEventListener("input", (e) => {
    textoBusqueda = e.target.value.toLowerCase();
    renderizarProductos();
  });
}

/* =========================
   COMPONENTES
========================= */
function cargarComponentes() {
  cargarHTML("header", "components/header.html");
  cargarHTML("sidebar", "components/sidebar.html");
  cargarHTML("footer", "components/footer.html");
  cargarHTML("modalCarrito", "components/carrito.html");
  cargarHTML("modalPago", "components/pago.html");
}

function cargarHTML(id, ruta) {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;

  fetch(ruta)
    .then(res => res.text())
    .then(data => {
      contenedor.innerHTML = data;

      // cuando carga header → activar buscador + carrito
      if (id === "header") {
        setTimeout(() => {
          iniciarBuscador();

          if (typeof actualizarCarrito === "function") {
            actualizarCarrito();
          }
        }, 100);
      }
    })
    .catch(err => console.error("Error cargando:", ruta, err));
}

/* =========================
   PRODUCTOS 🔥
========================= */
function renderizarProductos() {
  const contenedor = document.getElementById("listaProductos");
  if (!contenedor || typeof productos === "undefined") return;

  contenedor.innerHTML = "";

  const filtrados = productos.filter(prod => {

    const coincideCategoria =
      categoriaActual === "Todos" || prod.categoria === categoriaActual;

    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(textoBusqueda) ||
      prod.marca.toLowerCase().includes(textoBusqueda);

    return coincideCategoria && coincideBusqueda;
  });

  if (filtrados.length === 0) {
    contenedor.innerHTML = `
      <p style="padding:20px; text-align:center;">
        😕 No se encontraron productos
      </p>
    `;
    return;
  }

  filtrados.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <div class="img-container">
        <img src="${prod.imagen}" alt="${prod.nombre}">
      </div>

      <div class="marca">${prod.marca}</div>

      <div class="nombre">${prod.nombre}</div>

      <div class="precio">
        S/ ${prod.precio} <span>c/IGV</span>
      </div>

      <button class="btn-agregar" data-id="${prod.id}">
        AGREGAR
      </button>
    `;

    contenedor.appendChild(div);
  });

  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => {
      agregarAlCarrito(parseInt(btn.dataset.id));
    });
  });
}

/* =========================
   EVENTOS GENERALES 🔥
========================= */
document.addEventListener("click", function (e) {

  // 📂 ABRIR SIDEBAR
  if (e.target.closest(".menu-btn")) {
    document.getElementById("sidebarMenu")?.classList.add("activo");
  }

  // ❌ CERRAR SIDEBAR
  if (e.target.id === "cerrarSidebar") {
    document.getElementById("sidebarMenu")?.classList.remove("activo");
  }

  // 🛒 ABRIR CARRITO
  if (e.target.closest("#btnCarrito")) {
    abrirCarrito();
  }

  // ❌ CERRAR CARRITO
  if (e.target.id === "cerrarCarrito") {
    cerrarCarrito();
  }

  // 💳 IR A PAGAR
  if (e.target.id === "btnIrPagar") {
    cerrarCarrito();
    abrirPago();
  }

  // 🏠 IR HOME
  if (e.target.id === "btnIrHome") {
    window.location.href = "index.html";
  }

  // 🛍 SEGUIR COMPRANDO
  if (e.target.id === "btnSeguirComprando") {
    cerrarCarrito();
  }

  // 🔥 FILTRO CATEGORÍAS
  if (e.target.matches(".menu-categorias li")) {

    categoriaActual = e.target.dataset.categoria;

    document.querySelectorAll(".menu-categorias li")
      .forEach(li => li.classList.remove("activo"));

    e.target.classList.add("activo");

    renderizarProductos();
  }

  // ❌ MINI CARRITO
  if (e.target.id === "cerrarMini") {
    document.getElementById("miniCarrito")?.classList.remove("activo");
  }

  // 👉 IR DESDE MINI
  if (e.target.id === "btnIrCarrito") {
    document.getElementById("miniCarrito")?.classList.remove("activo");
    abrirCarrito();
  }

  // ❌ CERRAR PAGO
  if (e.target.id === "cerrarPago") {
    cerrarPago();
  }

  // ✅ CONFIRMAR PAGO
  if (e.target.id === "btnConfirmarPago") {
    confirmarPago();
  }

});

/* =========================
   MODAL CARRITO
========================= */
function abrirCarrito() {
  const modal = document.getElementById("carritoModal");
  if (modal) modal.style.display = "block";
}

function cerrarCarrito() {
  const modal = document.getElementById("carritoModal");
  if (modal) modal.style.display = "none";
}

/* =========================
   COMPONENTES
========================= */
function cargarComponentes() {
  cargarHTML("header", "components/header.html");
  cargarHTML("sidebar", "components/sidebar.html");
  cargarHTML("footer", "components/footer.html");
  cargarHTML("modalCarrito", "components/carrito.html");
  cargarHTML("modalPago", "components/pago.html");
}

function cargarHTML(id, ruta) {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;

  fetch(ruta)
    .then(res => res.text())
    .then(data => {
      contenedor.innerHTML = data;

      //  cuando carga header → activar buscador + carrito
      if (id === "header") {
        setTimeout(() => {
          iniciarBuscador();
          if (typeof actualizarCarrito === "function") {
            actualizarCarrito();
          }
        }, 100);
      }
    })
    .catch(err => console.error("Error cargando:", ruta, err));
}

/* =========================
   PRODUCTOS 
========================= */
function renderizarProductos() {
  const contenedor = document.getElementById("listaProductos");
  if (!contenedor || typeof productos === "undefined") return;

  contenedor.innerHTML = "";

  //  FILTRO COMBINADO
  const filtrados = productos.filter(prod => {

    const coincideCategoria =
      categoriaActual === "Todos" || prod.categoria === categoriaActual;

    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(textoBusqueda) ||
      prod.marca.toLowerCase().includes(textoBusqueda);

    return coincideCategoria && coincideBusqueda;
  });

  // ❌ SIN RESULTADOS
  if (filtrados.length === 0) {
    contenedor.innerHTML = `
      <p style="padding:20px; text-align:center;">
        😕 No se encontraron productos
      </p>
    `;
    return;
  }

  //  RENDER
  filtrados.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <div class="img-container">
        <img src="${prod.imagen}" alt="${prod.nombre}">
      </div>

      <div class="marca">${prod.marca}</div>

      <div class="nombre">${prod.nombre}</div>

      <div class="precio">
        S/ ${prod.precio} <span>c/IGV</span>
      </div>

      <button class="btn-agregar" data-id="${prod.id}">
        AGREGAR
      </button>
    `;

    contenedor.appendChild(div);
  });

  // EVENTOS BOTONES
  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => {
      agregarAlCarrito(parseInt(btn.dataset.id));
    });
  });
}

/* =========================
   EVENTOS GENERALES
========================= */
document.addEventListener("click", function (e) {

  // 📂 ABRIR SIDEBAR
if (e.target.closest(".menu-btn")) {
  document.getElementById("sidebarMenu")?.classList.add("activo");
  document.getElementById("overlay")?.classList.add("activo");
}

// ❌ CERRAR SIDEBAR
if (e.target.id === "cerrarSidebar" || e.target.id === "overlay") {
  document.getElementById("sidebarMenu")?.classList.remove("activo");
  document.getElementById("overlay")?.classList.remove("activo");
}

  // 🛒 ABRIR CARRITO
  if (e.target.closest("#btnCarrito")) {
    abrirCarrito();
  }

  // ❌ CERRAR CARRITO
  if (e.target.id === "cerrarCarrito") {
    cerrarCarrito();
  }

  // 💳 IR A PAGAR
  if (e.target.id === "btnIrPagar") {
    cerrarCarrito();
    abrirPago();
  }

  // 🏠 IR HOME
  if (e.target.id === "btnIrHome") {
    window.location.href = "index.html";
  }

  // 🛍 SEGUIR COMPRANDO
  if (e.target.id === "btnSeguirComprando") {
    cerrarCarrito();
  }

  //  FILTRO CATEGORÍAS
  if (e.target.matches(".menu-categorias li")) {

    categoriaActual = e.target.dataset.categoria;

    document.querySelectorAll(".menu-categorias li")
      .forEach(li => li.classList.remove("activo"));

    e.target.classList.add("activo");

    renderizarProductos();
  }

  // ❌ MINI CARRITO
  if (e.target.id === "cerrarMini") {
    document.getElementById("miniCarrito")?.classList.remove("activo");
  }

  //  IR DESDE MINI
  if (e.target.id === "btnIrCarrito") {
    document.getElementById("miniCarrito")?.classList.remove("activo");
    abrirCarrito();
  }

  // ❌ CERRAR PAGO
  if (e.target.id === "cerrarPago") {
    cerrarPago();
  }

  // ✅ CONFIRMAR PAGO
  if (e.target.id === "btnConfirmarPago") {
    confirmarPago();
  }

});

/* =========================
   MODAL CARRITO
========================= */
function abrirCarrito() {
  const modal = document.getElementById("carritoModal");
  if (modal) modal.style.display = "block";
}

function cerrarCarrito() {
  const modal = document.getElementById("carritoModal");
  if (modal) modal.style.display = "none";
}