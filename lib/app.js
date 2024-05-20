$(document).ready(function(){
  var espectaculosMostrados = false;
  var mostrado = $('#mostrado');
  
  ponerBienvenida();
  
  function ponerBienvenida(){
    mostrado.empty();
    mostrado.append('<h1>Movidas del parque</h1>')
  }
  
  function ponerAreas(){
    mostrado.empty();
    mostrado.append('<h1>Movidas de areas</h1>')
    mostrado.append('<div id="zonaAreas"></div>');
    //Obtener XML
    var xml=areasXML();
    var areas = xml.getElementsByTagName("area");
  
    //Funcion para añadir todas las áreas :D
    const areaHTML = $('#zonaAreas');
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
          li.classList.add("atraccion");
          li.textContent= nombreAtraccion;
          li.style.fontWeight = "normal";
          li.style.fontSize = "20px";
          listaAtracciones.append(li);
          const fav = document.createElement("i");
          fav.classList.add("boton");
          fav.innerHTML = "&#9734;"
          li.append(fav);
        }
    }
  
    //Añadir Favoritos
  $(".boton").on("click", function(){
    
    $(this).parent(".atraccion").toggleClass("fav");
  
    if($(this).hasClass("fav")){
      $(this).removeClass("fav");
      this.innerHTML = "&#9734;"
    } 
  
    else{
      $(this).addClass("fav");
      this.innerHTML = "&#9733;"
    } 
  
  })
  }
  
  function ponerEspectaculos(){
    mostrado.empty();
    mostrado.append('<h1 class="clicable "id="textoEspectaculos">Movidas de espectaculos</h1>')
    mostrado.append('<div id="espectaculos"></div>');
    //Mostrar texto cuando se pasa el raton por encima
  $('#textoEspectaculos').hover(function(){
    if(espectaculosMostrados==false){
      $(this).append($("<p> Haz click para saber mas...</p>"));
    }
  }, function(){
    $( this ).find( "p" ).last().remove();
  });
  
  //Llamar a la api y cambiar la flag
  $("#textoEspectaculos").on("click", function(){
      llamarAPI();
      espectaculosMostrados=true;  
  });
  }
  
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
  
  //Obtener los shows
  async function llamarAPI() {
    fetch("https://samuelencinas.dev/shows_parque/P01")
      .then(response => response.json())
      .then(json => {
        mostrarEspectaculos(json);
      }).catch(error => mensajeError());
      }
  
      function mensajeError(){
        const areaHTML = $('#espectaculos');
        $( areaHTML ).empty();
        const mensajeError = document.createElement("p");
        mensajeError.innerHTML = "Error al obtener los datos de los shows";
        mensajeError.style.fontWeight = 'bold';
        mensajeError.style.fontSize = '40px';
        areaHTML.append(mensajeError);
      }
      
  //Craftear el HTML de los shows
  function mostrarEspectaculos(espectaculos){
    
    const areaHTML = $('#espectaculos');
    areaHTML.empty();
    const shows = espectaculos.shows[0];
    Object.entries(shows).forEach(elem =>{
      
      const areaTematica = elem[0];
      const showsArea = elem[1];
  
      //HTML del área
      var seccionArea = document.createElement("section");
      const nombreArea = document.createElement("p");
      nombreArea.innerHTML = elem[0];
      const listaShows = document.createElement("ul");
  
      areaHTML.append(seccionArea);
      seccionArea.append(nombreArea);
      nombreArea.append(listaShows);
  
      //HTML de cada show
      showsArea.forEach(elem =>{
        const show = document.createElement("li");
        show.innerHTML = elem.name;
        const listaHoras = document.createElement("ul");
        show.append(listaHoras);
  
        //HTML horas de cada show
        if(elem.hours.length != 0){ 
          elem.hours.forEach(elem =>{
            const hora = document.createElement("li");
            hora.innerHTML = elem;
            listaHoras.append(hora);
          }); 
          
        }
        else{
          const mensajeError = document.createElement("li");
          mensajeError.innerHTML = "No hay horarios disponibles";
          listaHoras.append(mensajeError);
        }
        listaShows.append(show);
      });
    })
  
  }  
  
  //Botones de cambiar de seccion
  $("#irBienvenida").on("click", function(){
    console.log("hola");
    ponerBienvenida();
  }); 
  
  $("#irAreas").on("click", function(){
    ponerAreas();
  }); 
  
  $("#irEspectaculos").on("click", function(){
    ponerEspectaculos();
  }); 
  
  });