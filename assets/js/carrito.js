let carrito = obtenerCarrito();

/* =========================
   INICIO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
});

/* =========================
   OBTENER CARRITO
========================= */
function obtenerCarrito() {
  const data = localStorage.getItem("carrito");
  return data ? JSON.parse(data) : [];
}

/* =========================
   GUARDAR CARRITO
========================= */
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =========================
   AGREGAR PRODUCTO
========================= */
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarMiniCarrito(producto);
}

/* =========================
   AUMENTAR
========================= */
function aumentarCantidad(id) {
  const prod = carrito.find(p => p.id === id);
  if (!prod) return;

  prod.cantidad++;
  actualizarCarrito();
}

/* =========================
   DISMINUIR
========================= */
function disminuirCantidad(id) {
  const prod = carrito.find(p => p.id === id);
  if (!prod) return;

  prod.cantidad--;

  if (prod.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  actualizarCarrito();
}

/* =========================
   ELIMINAR
========================= */
function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCarrito();
}

/* =========================
   ACTUALIZAR
========================= */
function actualizarCarrito() {
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

/* =========================
   CONTADOR 🔴
========================= */
function actualizarContador() {
  const contador = document.getElementById("contador");
  if (!contador) return;

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  contador.textContent = totalItems;
  contador.style.display = totalItems === 0 ? "none" : "block";
}

/* =========================
   RENDERIZAR CARRITO
========================= */
function renderizarCarrito() {
  const contenedor = document.getElementById("carritoItems");
  const totalHTML = document.getElementById("carritoTotal");
  const subtotalHTML = document.getElementById("subtotal");
  const igvHTML = document.getElementById("igv");
  const btnPagar = document.getElementById("btnIrPagar");
  const btnHome = document.getElementById("btnIrHome");
  const btnSeguir = document.getElementById("btnSeguirComprando");

  if (!contenedor || !totalHTML) return;

  contenedor.innerHTML = "";

  /* 🔥 CARRITO VACÍO */
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div style="text-align:center; padding:30px;">
        <p style="font-size:18px; margin-bottom:10px;">
          🛒 Tu carrito está vacío
        </p>
        <small>Agrega productos para continuar</small>
      </div>
    `;

    totalHTML.textContent = "0.00";
    if (subtotalHTML) subtotalHTML.textContent = "0.00";
    if (igvHTML) igvHTML.textContent = "0.00";

    if (btnPagar) btnPagar.style.display = "none";
    if (btnHome) btnHome.style.display = "block";
    if (btnSeguir) btnSeguir.style.display = "none"; // 🔥 ocultar

    return;
  }

  /* 🔥 SI HAY PRODUCTOS */
  if (btnPagar) btnPagar.style.display = "block";
  if (btnHome) btnHome.style.display = "none";
  if (btnSeguir) btnSeguir.style.display = "block"; // 🔥 mostrar

  let total = 0;

  carrito.forEach(prod => {
    total += prod.precio * prod.cantidad;

    const div = document.createElement("div");
    div.classList.add("item-carrito");

    div.innerHTML = `
      <div class="item-info">
        <p><strong>${prod.nombre}</strong></p>
        <small>COD: ${prod.id}</small>
      </div>

      <div class="controles">
        <button onclick="disminuirCantidad(${prod.id})">−</button>
        <span>${prod.cantidad}</span>
        <button onclick="aumentarCantidad(${prod.id})">+</button>
      </div>

      <div class="item-precio">
        S/ ${(prod.precio * prod.cantidad).toFixed(2)}
      </div>

      <button class="btn-eliminar" onclick="eliminarDelCarrito(${prod.id})">
        🗑
      </button>
    `;

    contenedor.appendChild(div);
  });

  /* 🔥 CÁLCULOS */
  const subtotal = total / 1.18;
  const igv = total - subtotal;

  totalHTML.textContent = total.toFixed(2);
  if (subtotalHTML) subtotalHTML.textContent = subtotal.toFixed(2);
  if (igvHTML) igvHTML.textContent = igv.toFixed(2);
}

/* =========================
   MINI CARRITO ANIMADO 🔥
========================= */
function mostrarMiniCarrito(producto) {
  const modal = document.getElementById("miniCarrito");
  if (!modal) return;

  document.getElementById("miniImg").src = producto.imagen;
  document.getElementById("miniNombre").textContent = producto.nombre;
  document.getElementById("miniCodigo").textContent = "COD: " + producto.id;

  const item = carrito.find(p => p.id === producto.id);
  document.getElementById("miniCantidad").textContent = item.cantidad;

  modal.classList.remove("activo");

  setTimeout(() => {
    modal.classList.add("activo");
  }, 50);

  setTimeout(() => {
    modal.classList.remove("activo");
  }, 3000);
}