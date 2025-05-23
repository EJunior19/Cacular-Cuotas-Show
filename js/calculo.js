function formatearInputNumerico(input) {
  const valor = input.value.replace(/\D/g, '');
  if (!valor) {
    input.value = '';
    return;
  }
  input.value = parseInt(valor).toLocaleString('de-DE');
}

function obtenerValorNumerico(id) {
  const valor = document.getElementById(id).value.replace(/\./g, '');
  return parseInt(valor);
}

function calcularCredito() {
  const costoUnitario = obtenerValorNumerico('costoUnitario');
  const cantidad = obtenerValorNumerico('cantidad');
  const cuotas = parseInt(document.getElementById('cuotas').value);
  const margen = parseInt(document.getElementById('margen').value);

  if (isNaN(costoUnitario) || isNaN(cantidad) || isNaN(cuotas) || isNaN(margen)) {
    alert("Por favor, completá todos los campos correctamente.");
    return;
  }

  const precioTotal = Math.round(costoUnitario * cantidad * (1 + margen / 100));
  const montoCuota = Math.round(precioTotal / cuotas);

  let detalleCuotas = "";
  for (let i = 1; i <= cuotas; i++) {
    detalleCuotas += `<li>📦 Cuota ${i}: Gs ${montoCuota.toLocaleString('de-DE')}</li>`;
  }

  document.getElementById('resultado').innerHTML = `
    <div class="cuadro">
      <p><strong>Total a pagar:</strong> Gs ${precioTotal.toLocaleString('de-DE')}</p>
      <p><strong>Cuotas (${cuotas}):</strong></p>
      <ul>${detalleCuotas}</ul>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function () {
  const boton = document.getElementById('btnCambio');

  boton.addEventListener('click', function () {
    const cambio = parseFloat(document.getElementById('Cambiodolar').value.replace(/\./g, '').replace(',', '.'));
    const valor = parseFloat(document.getElementById('Valordolar').value.replace(/\./g, '').replace(',', '.'));

    if (isNaN(cambio) || isNaN(valor)) {
      alert('Por favor, escribí números válidos');
      return;
    }

    const total = cambio * valor;
    alert(`Resultado: ${total.toLocaleString('de-DE')} Gs`);
  });
});

function descargarPDF() {
  const elemento = document.getElementById('resultado');
  const opciones = {
    margin: 0.5,
    filename: 'simulacion_credito.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opciones).from(elemento).save();
}
