/* =========================
   ABRIR PAGO
========================= */
function abrirPago() {
  const modal = document.getElementById("pagoModal");
  const total = document.getElementById("carritoTotal");
  const totalPago = document.getElementById("totalPago");

  if (modal) modal.style.display = "block";

  // Pasar total al modal
  if (total && totalPago) {
    totalPago.textContent = total.textContent;
  }
}

/* =========================
   CERRAR PAGO
========================= */
function cerrarPago() {
  const modal = document.getElementById("pagoModal");
  if (modal) modal.style.display = "none";
}

/* =========================
   CONFIRMAR PAGO
========================= */
function confirmarPago() {
  const nombre = document.getElementById("nombre");
  const tarjeta = document.getElementById("tarjeta");
  const fecha = document.getElementById("fecha");
  const cvv = document.getElementById("cvv");
  const error = document.getElementById("errorPago");

  // Limpiar estilos previos
  [nombre, tarjeta, fecha, cvv].forEach(input => {
    input.style.border = "1px solid #ccc";
  });

  // Validar vacíos
  if (!nombre.value.trim() || !tarjeta.value.trim() || !fecha.value.trim() || !cvv.value.trim()) {
    error.textContent = "⚠️ Completa todos los campos";

    [nombre, tarjeta, fecha, cvv].forEach(input => {
      if (!input.value.trim()) {
        input.style.border = "1px solid red";
      }
    });

    return;
  }

  // Validar tarjeta
  if (tarjeta.value.length < 5) {
    error.textContent = "⚠️ Número de tarjeta inválido";
    tarjeta.style.border = "1px solid red";
    return;
  }

  // Validar CVV
  if (cvv.value.length < 3) {
    error.textContent = "⚠️ CVV inválido";
    cvv.style.border = "1px solid red";
    return;
  }

  // Validar fecha básica
  if (!/^\d{2}\/\d{2}$/.test(fecha.value)) {
    error.textContent = "⚠️ Formato de fecha inválido (MM/AA)";
    fecha.style.border = "1px solid red";
    return;
  }

  //  TODO OK
  error.textContent = "";

  alert("✅ Pago realizado con éxito");

  // Vaciar carrito
  carrito = [];
  localStorage.removeItem("carrito");

  cerrarPago();
  actualizarCarrito();
}