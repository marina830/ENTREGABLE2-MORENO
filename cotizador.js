const form = document.getElementById("formCotizacion");
const resultadoDiv = document.getElementById("resultadoCotizacion");

const preciosDestino = {
  "Córdoba": 100,
  "Mendoza": 120,
  "Jujuy": 130,
  "Salta": 130,
  "Cataratas": 150,
  "Río de Janeiro": 250,
  "Santiago de Chile": 200
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const destino = document.getElementById("destino").value;
  const salida = new Date(document.getElementById("salida").value);
  const regreso = new Date(document.getElementById("regreso").value);
  const adultos = parseInt(document.getElementById("adultos").value);
  const menores = parseInt(document.getElementById("menores").value);

  if (!destino || isNaN(salida) || isNaN(regreso) || adultos < 1) {
    resultadoDiv.textContent = "Completa todos los campos correctamente.";
    return;
  }

  const diferenciaDias = Math.ceil((regreso - salida) / (1000 * 60 * 60 * 24));
  if (diferenciaDias < 5 || diferenciaDias > 30) {
    resultadoDiv.textContent = "La duración debe ser entre 5 y 30 días.";
    return;
  }

  const precioBase = preciosDestino[destino];
  const totalUSD = diferenciaDias * precioBase * (adultos + menores * 0.5);
  const totalARS = totalUSD * 1000; // ejemplo conversión simple

  const mensaje = `📍 Destino: ${destino}
🗓️ Duración: ${diferenciaDias} días
👤 Adultos: ${adultos}, 👶 Menores: ${menores}
💵 Total: USD ${totalUSD.toFixed(2)} / ARS ${totalARS.toFixed(0)}`;

  resultadoDiv.textContent = mensaje;

  localStorage.setItem("ultimaCotizacion", JSON.stringify({
    destino,
    salida: salida.toDateString(),
    regreso: regreso.toDateString(),
    adultos,
    menores,
    totalUSD,
    totalARS
  }));
});
function mostrarInfo() {
  const div = document.getElementById("infoEmpresa");
  div.innerHTML = `
    🌍 <strong>COTAMAR</strong> es una consultora de viajes pensada y diseñada por un matrimonio argentino apasionado por recorrer el mundo. 
    <br><br>
    Hace más de 15 años que viajan en sus tiempos libres y decidieron compartir su experiencia ayudando a otras personas a planificar viajes únicos y accesibles.
    <br><br>
    <em>Todo es posible... ¡tu viaje también!</em>
  `;
  div.style.display = "block";
}
function mostrarReintegro() {
  document.getElementById("formReintegro").style.display = "block";
  document.getElementById("infoEmpresa").style.display = "none";
}
// Validación del formulario de reintegro
document.getElementById("reintegroForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const voucher = document.getElementById("voucher").value.trim();
  const doc = document.getElementById("documento").value.trim();

  if (voucher && doc) {
    alert("✅ Solicitud enviada correctamente. Nos contactaremos pronto.");
    this.reset(); // limpia los campos
  } else {
    alert("⚠️ Por favor completá todos los campos.");
  }
});
