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
    });
    }

function mostrarEspectaculos(espectaculos){
  console.log(espectaculos.shows.PLA);

  espectaculos.shows.forEach(element => {
    console.log(element);
    console.log("OTRO");
  });

}


  var xml=areasXML();
  var areas = xml.getElementsByTagName("area");

  //Funcion para añadir todas las áreas :D
  const areaHTML = $('#area1');
  for (var i=0; i<areas.length; i++){
   
    //Obtener nombre de área 
    var area = areas[i].getElementsByTagName("nombre")[0];
    var nombre = area.firstChild.nodeValue;
 
    

    //Añadir al HTML
    var elem = document.createElement("p");
    var listaAtracciones = document.createElement("ul");
    elem.style.fontWeight = 'bold';
    elem.style.fontSize = "40px";
    areaHTML.append(elem);
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


});