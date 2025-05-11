class Encuesta {
    constructor(pregunta, opciones) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.votos = new Array(opciones.length).fill(0);
    }

    votar(indice) {
        if (indice >= 0 && indice < this.opciones.length) {
            this.votos[indice]++;
        } else {
            alert("Opción inválida");
        }
    }

    totalVotos() {
        return this.votos.reduce((acc, val) => acc + val, 0);
    }

    obtenerHTML(indexEncuesta) {
        const contenedor = document.createElement('div');
        contenedor.classList.add('encuesta');
        contenedor.innerHTML = `<h3>${this.pregunta}</h3>`;

        this.opciones.forEach((opcion, i) => {
            const porcentaje = this.totalVotos() > 0
                ? ((this.votos[i] / this.totalVotos()) * 100).toFixed(1)
                : 0;
            const btn = document.createElement('button');
            btn.textContent = `${opcion} (${this.votos[i]} votos | ${porcentaje}%)`;
            btn.onclick = () => {
                gestor.encuestas[indexEncuesta].votar(i);
                renderEncuestas();
            };
            contenedor.appendChild(btn);
        });

        return contenedor;
    }
}

class GestorEncuestas {
    constructor() {
        this.encuestas = [];
    }

    agregarEncuesta(pregunta, opciones) {
        if (opciones.length >= 2) {
            this.encuestas.push(new Encuesta(pregunta, opciones));
        }
    }
}

const gestor = new GestorEncuestas();

gestor.agregarEncuesta("¿Te gusta la programación?", ["Sí", "No"]);
gestor.agregarEncuesta("¿Prefieres JavaScript o Python?", ["JavaScript", "Python", "Ambos"]);
gestor.agregarEncuesta("¿Usas GitHub a diario?", ["Sí", "No"]);
gestor.agregarEncuesta("¿Qué sistema operativo usas?", ["Windows", "macOS", "Linux"]);
gestor.agregarEncuesta("¿Tomas café mientras programas?", ["Sí", "No", "A veces"]);
gestor.agregarEncuesta("¿Conoces Git?", ["Sí", "No"]);
gestor.agregarEncuesta("¿Te gustan los proyectos colaborativos?", ["Sí", "No"]);
gestor.agregarEncuesta("¿Estás disfrutando este proyecto?", ["Mucho", "Más o menos", "No"]);




function renderEncuestas() {
    const contenedor = document.getElementById('contenido');
    contenedor.innerHTML = '';
    gestor.encuestas.forEach((encuesta, index) => {
        contenedor.appendChild(encuesta.obtenerHTML(index));
    });
}

document.addEventListener('DOMContentLoaded', renderEncuestas);
