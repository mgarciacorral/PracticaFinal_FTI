$(document).ready(function(){



function areasXML(){
  
  const request = new XMLHttpRequest();
  try{
    request.open("GET", "lib/info_areas.xml", false);
    request.send();
    var xml= request.responseXML;
    var areas = xml.getElementsByTagName("area");
  
    return areas;

  } catch(error) {
    console.log("Error");
    return null;
  }
}

//$('#miboton').click(() =>{
  areas=areasXML();
  var nombreArea = areas[0].getElementsByTagName("nombre")[0];
  var n2 = nombreArea.childNodes[0];
  //console.log(n2.nodeValue);
  const areaHTML = $('#area1');
  areaHTML.append(n2.nodeValue);
//});


});