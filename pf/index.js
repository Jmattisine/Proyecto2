const crearEncuesta = (pregunta, opciones) => ({
  pregunta,
  opciones,
  votos: Array(opciones.length).fill(0)
});

const votar = (encuesta, indice) => {
  if (indice >= 0 && indice < encuesta.opciones.length) {
    return {
      ...encuesta,
      votos: encuesta.votos.map((v, i) => i === indice ? v + 1 : v)
    };
  }
  return encuesta;
};

const totalVotos = encuesta => encuesta.votos.reduce((a, b) => a + b, 0);

const obtenerHTML = (encuesta, indexEncuesta) => {
  const contenedor = document.createElement('div');
  contenedor.classList.add('encuesta');
  contenedor.innerHTML = `<h3>${encuesta.pregunta}</h3>`;

  encuesta.opciones.forEach((opcion, i) => {
    const porcentaje = totalVotos(encuesta) > 0
      ? ((encuesta.votos[i] / totalVotos(encuesta)) * 100).toFixed(1)
      : 0;
    const btn = document.createElement('button');
    btn.textContent = `${opcion} (${encuesta.votos[i]} votos | ${porcentaje}%)`;
    btn.onclick = () => {
      encuestasPF[indexEncuesta] = votar(encuesta, i);
      renderEncuestasPF();
    };
    contenedor.appendChild(btn);
  });

  return contenedor;
};

let encuestasPF = [
  crearEncuesta("¿Te gusta la programación?", ["Sí", "No"]),
  crearEncuesta("¿Prefieres JavaScript o Python?", ["JavaScript", "Python", "Ambos"]),
  crearEncuesta("¿Usas GitHub a diario?", ["Sí", "No"]),
  crearEncuesta("¿Qué sistema operativo usas?", ["Windows", "macOS", "Linux"]),
  crearEncuesta("¿Tomas café mientras programas?", ["Sí", "No", "A veces"]),
  crearEncuesta("¿Conoces Git?", ["Sí", "No"]),
  crearEncuesta("¿Te gustan los proyectos colaborativos?", ["Sí", "No"]),
  crearEncuesta("¿Estás disfrutando este proyecto?", ["Mucho", "Más o menos", "No"]),
];



function renderEncuestasPF() {
  const contenedor = document.getElementById('contenido');
  contenedor.innerHTML = '';
  encuestasPF.forEach((encuesta, index) => {
    contenedor.appendChild(obtenerHTML(encuesta, index));
  });
}

document.addEventListener('DOMContentLoaded', renderEncuestasPF);
