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
  var nombreArea = areas[0].getElementsByTagName("nombre")[0];
  var n2 = nombreArea.childNodes[0];
  //console.log(n2.nodeValue);
  

  //Funcion para añadir todos los nombres de áreas :D
  const areaHTML = $('#area1');
  for (var i=0; i<areas.length; i++){
    var elem = document.createElement("p");
    var area = areas[i].getElementsByTagName("nombre")[0];
    var nombre = area.firstChild.nodeValue;
    areaHTML.append(elem);
    elem.append(nombre);
  }

  
$('#miboton').click(() =>{
  llamarAPI();

});


});