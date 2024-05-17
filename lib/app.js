$(document).ready(function(){



function areasXML(){
  
  const request = new XMLHttpRequest();
  try{
    request.open("GET", "lib/info_areas.xml", false);
    request.send();
    var xml= request.responseXML;
    return xml;

  } catch(error) {
    console.log("Error");
    return null;
  }
}

async function llamarAPI() {
  fetch("https://samuelencinas.dev/shows_parque/P01")
    .then(response => response.json())
    .then(json => {
      mostrarEspectaculos(json);
    }).catch(err => console.log("Error"));
    }

function mostrarEspectaculos(espectaculos){
  
  const areaHTML = $('#espectaculos');
  const shows = espectaculos.shows[0];
  Object.entries(shows).forEach(elem =>{
    
    const areaTematica = elem[0];
    const showsArea = elem[1];
    console.log("area: "+areaTematica);

    var seccionArea = document.createElement("section");
    const nombreArea = document.createElement("p");
    nombreArea.innerHTML = elem[0];
    const listaShows = document.createElement("ul");

    areaHTML.append(seccionArea);
    seccionArea.append(nombreArea);
    nombreArea.append(listaShows);

    showsArea.forEach(elem =>{
      const show = document.createElement("li");
      show.innerHTML = elem.name;
      const listaHoras = document.createElement("ul");
      show.append(listaHoras);
      if(elem.hours.length != 0){ 
        elem.hours.forEach(elem =>{
          const hora = document.createElement("li");
          hora.innerHTML = elem;
          listaHoras.append(hora);
        }); 
        
      }
      else{
        show.append("No hay horarios disponibles");
      }
      listaShows.append(show);
    });
  })

}

  //Obtener XML
  var xml=areasXML();
  var areas = xml.getElementsByTagName("area");

  //Funcion para añadir todas las áreas :D
  const areaHTML = $('#area1');
  for (var i=0; i<areas.length; i++){
   
    //Obtener nombre de área 
    var area = areas[i].getElementsByTagName("nombre")[0];
    var nombre = area.firstChild.nodeValue;
 
    

    //Añadir al HTML
    var seccionArea = document.createElement("section");
    var elem = document.createElement("p");
    var listaAtracciones = document.createElement("ul");
    elem.style.fontWeight = 'bold';
    elem.style.fontSize = "40px";
    areaHTML.append(seccionArea);
    seccionArea.append(elem);
    elem.append(nombre);
    elem.append(listaAtracciones);

    //Obtener nombres de atracciones
    var atracciones = areas[i].getElementsByTagName("atraccion");
      for (var j=0; j<atracciones.length; j++){
        var atraccion = atracciones[j].getElementsByTagName("nombre_atraccion")[0];
        var nombreAtraccion = atraccion.firstChild.nodeValue;

        //Añadir al HTML
        const li = document.createElement("li");
        li.textContent= nombreAtraccion;
        li.style.fontWeight = "normal";
        li.style.fontSize = "20px";
        listaAtracciones.append(li);
      }
  }

  
$('#miboton').click(() =>{
  llamarAPI();

});
llamarAPI();


});