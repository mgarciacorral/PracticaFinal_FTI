// Obtener datos de los archivos XML y JSON
const infoAreas = fetch('info_areas.xml')
  .then(response => response.text())
  .then(parseXML);

const tiemposEspera = fetch('tiempos_espera.json')
  .then(response => response.json());

const espectaculos = fetch('https://samuelencinas.dev/shows_parque/P01')
  .then(response => response.json());

// Procesar los datos obtenidos y generar el HTML dinámico
Promise.all([infoAreas, tiemposEspera, espectaculos])
  .then(data => {
    const [areasXML, tiemposEsperaJSON, espectaculosJSON] = data;
    const areas = parseAreas(areasXML);

    // Generar HTML para la sección de bienvenida
    const bienvenidaHTML = generateBienvenidaHTML();
    document.getElementById('bienvenida').innerHTML = bienvenidaHTML;

    // Generar HTML para las áreas y atracciones
    const areasHTML = generateAreasHTML(areas, tiemposEsperaJSON);
    document.getElementById('areas').innerHTML = areasHTML;

    // Generar HTML para los espectáculos
    const espectaculosHTML = generateEspectaculosHTML(espectaculosJSON);
    document.getElementById('espectaculos').innerHTML = espectaculosHTML;
  });

// Funciones para parsear XML y JSON
function parseXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  return xmlDoc;
}

function parseAreas(areasXML) {
  const areas = [];
  const areasElements = areasXML.getElementsByTagName('area');

  for (const areaElement of areasElements) {
    const area = {
      id: areaElement.getAttribute('ID'),
      nombre: areaElement.getElementsByTagName('nombre')[0].textContent,
      atracciones: []
    };

    const atraccionesElements = areaElement.getElementsByTagName('atraccion');

    for (const atraccionElement of atraccionesElements) {
      const atraccion = {
        id: atraccionElement.getAttribute('ID'),
        nombre: atraccionElement.getElementsByTagName('nombre_atraccion')[0].textContent,
        estado: atraccionElement.getElementsByTagName('estado')[0].textContent,
        alturaMinima: parseFloat(atraccionElement.getElementsByTagName('altura_minima')[0].textContent),
        intensidad: atraccionElement.getElementsByTagName('intensidad')[0].textContent,
        express: atraccionElement.getElementsByTagName('express')[0].textContent === 'Si',
      };
      area.atracciones.push(atraccion);
    }
    areas.push(area);
  }
  return areas;
}

// Funciones para generar HTML dinámico (Faltan implementar)
function generateBienvenidaHTML() {
  // Implementar la lógica para generar el HTML de bienvenida
  return `
    <p>Introduce aquí el contenido de la bienvenida del parque</p>
  `;
}

function generateAreasHTML(areas, tiemposEsperaJSON) {
  let areasHTML = '';
  for (const area of areas) {
    areasHTML += `
      <h3>${area.nombre}</h3>
      <ul>`;
    for (const atraccion of area.atracciones) {
      let tiempoEspera = tiemposEsperaJSON[atraccion.id];
      let tiempoEsperaNormal = '';
      let tiempoEsperaExpress = '';
      if (Array.isArray(tiempoEspera)) {
        tiempoEsperaNormal = tiempoEspera[0];
        tiempoEsperaExpress = tiempoEspera[1];
      } else {
        tiempoEsperaNormal = tiempoEspera;
      }
      areasHTML += `
        <li>
          ${atraccion.nombre} - Estado: ${atraccion.estado} (Altura mínima: ${atraccion.alturaMinima}m) - Intensidad: ${atraccion.intensidad}`;
      if (atraccion.express) {
        areasHTML += ` - Tiempo Espera: ${tiempoEsperaNormal} min (Normal) / ${tiempoEsperaExpress} min (Express)`;
      } else {
        areasHTML += ` - Tiempo Espera: ${tiempoEsperaNormal} min`;
      }
      areasHTML += `
        </li>`;
    }
    areasHTML += `
      </ul>`;
  }
  return areasHTML;
}

function generateEspectaculosHTML(espectaculosJSON) {
    let espectaculosHTML = '';
    for (const area in espectaculosJSON.shows) {
      espectaculosHTML += `
        <h3>${area}</h3>
        <ul>`;
      for (const espectaculo of espectaculosJSON.shows[area]) {
        espectaculosHTML += `
          <li>
            ${espectaculo.name} - Horarios: ${espectaculo.hours.join(', ')}
          </li>`;
      }
      espectaculosHTML += `
        </ul>`;
    }
    return espectaculosHTML;
}
  