const productos = [
  // 🔧 HERRAMIENTAS
  { id: 1, marca: "TOTAL", nombre: "Taladro Percutor 650W", precio: 120, categoria: "Herramientas", imagen: "assets/img/taladro.jpg" },
  { id: 2, marca: "STANLEY", nombre: "Caja de Herramientas 19", precio: 60, categoria: "Herramientas", imagen: "assets/img/cajaherramienta.jpg" },
  { id: 3, marca: "STANLEY", nombre: "Alicate Universal 8\"", precio: 20, categoria: "Herramientas", imagen: "assets/img/alicate.jpg" },
  { id: 4, marca: "STANLEY", nombre: "Juego de Llaves Mixtas 12pz", precio: 95, categoria: "Herramientas", imagen: "assets/img/llaves.jpg" },
  { id: 5, marca: "STANLEY", nombre: "Juego de Dados 25pz", precio: 220, categoria: "Herramientas", imagen: "assets/img/juegodados.jpg" },

  // 🔋 BATERÍAS
  { id: 6, marca: "POWER TRUCK", nombre: "Batería 33 placas", precio: 840, categoria: "Baterías", imagen: "assets/img/bateria1.jpg" },
  { id: 7, marca: "ETNA", nombre: "Batería 15 placas", precio: 350, categoria: "Baterías", imagen: "assets/img/bateria2.jpg" },
  { id: 8, marca: "ENERJET", nombre: "Batería 20 placas", precio: 649, categoria: "Baterías", imagen: "assets/img/bateria3.jpg" },
  { id: 9, marca: "VARTA", nombre: "Batería 17\"", precio: 480, categoria: "Baterías", imagen: "assets/img/bateria4.jpg" },
  { id: 10, marca: "ULTRA START", nombre: "Batería 950 CCA", precio: 287, categoria: "Baterías", imagen: "assets/img/bateria5.jpg" },

  // 🛢️ LUBRICANTES
  { id: 11, marca: "SHELL", nombre: "Aceite Rimula 15W-40", precio: 305.9, categoria: "Lubricantes", imagen: "assets/img/aceite1.jpg" },
  { id: 12, marca: "SHELL", nombre: "Aceite Tellus 68", precio: 299, categoria: "Lubricantes", imagen: "assets/img/aceite2.jpg" },
  { id: 13, marca: "SHELL", nombre: "Aceite Spirax 85W-140", precio: 356, categoria: "Lubricantes", imagen: "assets/img/aceite3.jpg" },
  { id: 14, marca: "MOBIL", nombre: "Aceite 15W-40", precio: 309.9, categoria: "Lubricantes", imagen: "assets/img/aceite4.png" },
  { id: 15, marca: "FEDERAL", nombre: "Aceite AW 68", precio: 199.9, categoria: "Lubricantes", imagen: "assets/img/aceite5.jpg" },

  // ⚡ ELECTRICIDAD
  { id: 16, marca: "PHILIPS", nombre: "Faro LED 65W", precio: 65, categoria: "Electricidad", imagen: "assets/img/faro1.jpg" },
  { id: 17, marca: "GOTEK", nombre: "Faro Ámbar 55W", precio: 45, categoria: "Electricidad", imagen: "assets/img/faro2.jpg" },
  { id: 18, marca: "KOBO", nombre: "Faro LED Cuadrado", precio: 59.9, categoria: "Electricidad", imagen: "assets/img/faro3.jpg" },
  { id: 19, marca: "STARK", nombre: "Faro 35W", precio: 29.9, categoria: "Electricidad", imagen: "assets/img/faro4.jpg" },
  { id: 20, marca: "KOBO", nombre: "Faro LED 20W", precio: 20, categoria: "Electricidad", imagen: "assets/img/faro5.jpg" },

  // 🛠 CONTROL DE CARGA
  { id: 21, marca: "KINEDYNE", nombre: "Cinta 4\" con Ratchet 9m", precio: 189, categoria: "Control de Carga", imagen: "assets/img/control1.jpg" },
  { id: 22, marca: "KINEDYNE", nombre: "Cadena 3/8 x 6m", precio: 199.9, categoria: "Control de Carga", imagen: "assets/img/control2.jpg" },
  { id: 23, marca: "KINEDYNE", nombre: "Trinquete 3/8 - 1/2", precio: 129.9, categoria: "Control de Carga", imagen: "assets/img/control3.jpg" },
  { id: 24, marca: "KINEDYNE", nombre: "Cinta Gancho Plano 2\"", precio: 18, categoria: "Control de Carga", imagen: "assets/img/control4.jpg" },
  { id: 25, marca: "KINEDYNE", nombre: "Winche Soldable 4\"", precio: 22, categoria: "Control de Carga", imagen: "assets/img/control5.jpg" },

  // 🦺 SEGURIDAD
  { id: 26, marca: "STEELPRO", nombre: "Guantes Spider", precio: 4.9, categoria: "Seguridad Industrial", imagen: "assets/img/seguridad1.jpg" },
  { id: 27, marca: "STEELPRO", nombre: "Botas Punta de Acero T40", precio: 79.9, categoria: "Seguridad Industrial", imagen: "assets/img/seguridad2.jpg" },
  { id: 28, marca: "STEELPRO", nombre: "Guantes de Látex", precio: 5.9, categoria: "Seguridad Industrial", imagen: "assets/img/seguridad3.jpg" },
  { id: 29, marca: "STEELPRO", nombre: "Casco Amarillo", precio: 15, categoria: "Seguridad Industrial", imagen: "assets/img/seguridad4.jpg" },
  { id: 30, marca: "STEELPRO", nombre: "Barbiquejo", precio: 1.9, categoria: "Seguridad Industrial", imagen: "assets/img/seguridad5.jpg" },

  // 🚚 REPUESTOS
  { id: 31, marca: "SUNTECH", nombre: "Aro Acero 8.25 x 22.5", precio: 230, categoria: "Repuestos de Transporte", imagen: "assets/img/repuestos1.jpg" },
  { id: 32, marca: "SUNTECH", nombre: "Aro Acero 8.5 x 24", precio: 435, categoria: "Repuestos de Transporte", imagen: "assets/img/repuestos2.jpg" },
  { id: 33, marca: "SUNTECH", nombre: "Eje Americano 71.5", precio: 2335.9, categoria: "Repuestos de Transporte", imagen: "assets/img/repuestos3.jpg" },
  { id: 34, marca: "SUNTECH", nombre: "Llanta 11R22.5 Mixta", precio: 535, categoria: "Repuestos de Transporte", imagen: "assets/img/repuestos4.jpg" },
  { id: 35, marca: "BRIDGESTONE", nombre: "Llanta 11R22.5", precio: 1475.9, categoria: "Repuestos de Transporte", imagen: "assets/img/repuestos5.jpg" },
  { id: 36, marca: "OVATION", nombre: "Llanta 245/75 R16", precio: 349, categoria: "Repuestos de Transporte", imagen: "assets/img/repuestos6.jpg" },

];