$(document).ready(function () {
	var espectaculosMostrados = false;
	var areasMostradas = false;
	var tiempos_espera_JSON;
  
	var atraccionesFav = JSON.parse(localStorage.getItem("dato"));
	if (atraccionesFav == null) {
	  atraccionesFav = [];
	}
  
	const DOMAreas = document.createElement("main");
	DOMAreas.setAttribute("id", "DOMAreas");
	DOMAreas.setAttribute("class", "apartado");
  
	const DOMEspectaculos = document.createElement("main");
	DOMEspectaculos.setAttribute("id", "DOMEspectaculos");
	DOMEspectaculos.setAttribute("class", "apartado");
  
	const DOMSugerencias = document.createElement("main");
	DOMSugerencias.setAttribute("id", "DOMSugerencias");
	DOMSugerencias.setAttribute("class", "apartado");
  
	const mostrado = $("#content");
  
	ponerBienvenida();
	cargarJSON();
  
	function ponerBienvenida() {
	  $("#DOMBienvenida").show();
	  scrollArriba();
	}
  
	function ponerSugerencia() {
	  $("#DOMSugerencias").show();
	  scrollArriba();
	}
  
	function ponerAreas() {
	  if (areasMostradas) {
		$("#DOMAreas").show();
	  } else {
		const h1 = document.createElement("h1");
		h1.innerHTML = "Áreas";
		DOMAreas.append(h1);
  
		const div = document.createElement("div");
		div.setAttribute("id", "zonaAreas");
		DOMAreas.append(div);
  
		//Obtener XML
		var xml = areasXML();
		var areas = xml.getElementsByTagName("area");
  
		//Funcion para añadir todas las áreas :D
		const areaHTML = div;
		for (var i = 0; i < areas.length; i++) {
		  //Obtener nombre de área
		  var area = areas[i].getElementsByTagName("nombre")[0];
		  var nombre = area.firstChild.nodeValue;
  
		  //Añadir al HTML
		  const seccionArea = document.createElement("section");
		  seccionArea.setAttribute("class", "area");
		  const elem = document.createElement("p");
		  const nombreArea = document.createElement("i");
		  nombreArea.setAttribute("class", "nombreArea");
		  nombreArea.innerHTML = nombre;
		  const listaAtracciones = document.createElement("ul");
  
		  listaAtracciones.setAttribute("class", "listaAtracciones");
  
		  areaHTML.append(seccionArea);
		  seccionArea.append(elem);
		  elem.append(nombreArea);
		  elem.append(listaAtracciones);
  
		  //Obtener nombres de atracciones
		  var atracciones = areas[i].getElementsByTagName("atraccion");
  
		  for (var j = 0; j < atracciones.length; j++) {
			var atraccion =
			  atracciones[j].getElementsByTagName("nombre_atraccion")[0];
			var nombreAtraccion = atraccion.firstChild.nodeValue;
			var idAtraccion =
			  "../resources/atracciones/" +
			  atracciones[j].getAttribute("ID") +
			  ".jpg";
  
			//Añadir al HTML
			const li = document.createElement("li");
  
			const divAtraccion = document.createElement("div");
			const popUp = document.createElement("a");
			li.append(popUp);
			li.append(divAtraccion);
  
			const imagenAtraccion = document.createElement("img");
			imagenAtraccion.setAttribute("class", "imgAtraccion");
			imagenAtraccion.setAttribute("src", idAtraccion);
			imagenAtraccion.onerror = function () {
			  this.src = "../resources/atracciones/no-image.jpg";
			};
			popUp.append(imagenAtraccion);
  
			divAtraccion.textContent = nombreAtraccion;
			li.style.cursor = "pointer";
			divAtraccion.setAttribute("class", "nombreAtraccion");
  
			li.classList.add("atraccion");
			listaAtracciones.append(li);
  
			const fav = document.createElement("a");
			fav.classList.add("boton");
			fav.innerHTML = "&#9734;";
			divAtraccion.append(fav);
			fav.setAttribute("idAtraccion", atracciones[j].getAttribute("ID"));
  
			if (atraccionesFav.includes(atracciones[j].getAttribute("ID"))) {
			  $(fav).addClass("favBoton");
			  fav.innerHTML = "&#9733;";
			  $(fav)
				.parent(".nombreAtraccion")
				.parent(".atraccion")
				.toggleClass("fav");
			}
  
			//Añadir PopUps
			const popUpAtraccion = document.createElement("div");
			const contenidoPopUp = document.createElement("div");
  
			const imagenAtraccion2 = document.createElement("img");
			imagenAtraccion2.setAttribute("class", "imgAtraccion");
			imagenAtraccion2.setAttribute("src", idAtraccion);
			imagenAtraccion2.onerror = function () {
			  this.src = "../resources/atracciones/no-image.jpg";
			};
  
			//Añadir imagen al popUp
			contenidoPopUp.append(imagenAtraccion2);
  
			//Añadir nombre
			const nombre = document.createElement("a");
			nombre.innerHTML = nombreAtraccion;
			nombre.setAttribute("class", "nombreAtraccionPopUp");
			contenidoPopUp.append(nombre);
  
			//Añadir estado
			var atraccion = atracciones[j].getElementsByTagName("estado")[0];
			var nombreAtraccion = atraccion.firstChild.nodeValue;
  
			const estado = document.createElement("a");
			estado.innerHTML = "Estado: " + nombreAtraccion;
			contenidoPopUp.append(estado);
  
			//Añadir altura minima
			try {
			  var atraccion =
				atracciones[j].getElementsByTagName("altura_minima")[0];
			  var nombreAtraccion = atraccion.firstChild.nodeValue;
			} catch {
			  nombreAtraccion = "No hay altura mínima ;)";
			}
  
			const alturaMin = document.createElement("a");
			alturaMin.innerHTML = "Altura mínima: " + nombreAtraccion;
			contenidoPopUp.append(alturaMin);
  
			//Añadir altura maxima, si no hay se pone un texto indicandolo
			try {
			  var atraccion =
				atracciones[j].getElementsByTagName("altura_maxima")[0];
			  var nombreAtraccion = atraccion.firstChild.nodeValue;
			} catch {
			  nombreAtraccion = "No hay altura máxima ;)";
			}
  
			const alturaMax = document.createElement("a");
			alturaMax.innerHTML = "Altura máxima: " + nombreAtraccion;
			contenidoPopUp.append(alturaMax);
  
			//Añadir Intensidad
			var atraccion = atracciones[j].getElementsByTagName("intensidad")[0];
			var nombreAtraccion = atraccion.firstChild.nodeValue;
  
			const intensidad = document.createElement("a");
			intensidad.innerHTML = "Intensidad: " + nombreAtraccion;
			contenidoPopUp.append(intensidad);
  
			//Añadir Express
			var atraccion = atracciones[j].getElementsByTagName("express")[0];
			var expressValor = atraccion.firstChild.nodeValue;
  
			const express = document.createElement("a");
			express.innerHTML = "Express: " + expressValor;
			contenidoPopUp.append(express);
  
			//Tiempos espera
			const tiempo_espera = document.createElement("a");
  
			for (var id in tiempos_espera_JSON) {
			  if (id == atracciones[j].getAttribute("ID")) {
				if (Array.isArray(tiempos_espera_JSON[id])) {
				  tiempo_espera.innerHTML =
					"Tiempo de espera: " +
					tiempos_espera_JSON[id][0] +
					"min - Express: " +
					tiempos_espera_JSON[id][1] +
					"min";
				} else {
				  tiempo_espera.innerHTML =
					"Tiempo de espera: " + tiempos_espera_JSON[id] + "min";
				}
			  }
			}
  
			contenidoPopUp.append(tiempo_espera);
  
			//Boton Cerrar
			const cerrarPopUp = document.createElement("p");
			cerrarPopUp.innerHTML = "X";
			cerrarPopUp.setAttribute("class", "cerrarPopUp");
			contenidoPopUp.append(cerrarPopUp);
  
			popUpAtraccion.setAttribute("class", "popUp");
			popUpAtraccion.setAttribute("id", atracciones[j].getAttribute("ID"));
			popUpAtraccion.append(contenidoPopUp);
  
			$("#content").append(popUpAtraccion);
			popUpAtraccion.style.display = "none";
  
			li.addEventListener("click", (event) => {
			  $("html, body").css({
				overflow: "hidden",
				height: "100%",
			  });
			  popUpAtraccion.style.display = "flex";
			});
  
			cerrarPopUp.addEventListener("click", (event) => {
			  $("html, body").css({
				overflow: "auto",
				height: "auto",
			  });
			  popUpAtraccion.style.display = "none";
			});
		  }
  
		  mostrado.append(DOMAreas);
		  areasMostradas = true;
		}
  
		//Añadir Favoritos
		$(".boton").on("click", function () {
		  event.stopPropagation();
		  $(this)
			.parent(".nombreAtraccion")
			.parent(".atraccion")
			.toggleClass("fav");
  
		  if ($(this).hasClass("favBoton")) {
			$(this).removeClass("favBoton");
			this.innerHTML = "&#9734;";
			atraccionesFav.splice(
			  atraccionesFav.indexOf(this.getAttribute("idAtraccion")),
			  1
			);
		  } else {
			$(this).addClass("favBoton");
			this.innerHTML = "&#9733;";
			atraccionesFav.push($(this).attr("idAtraccion"));
		  }
		});
  
		$("#DOMAreas").hide();
	  }
	  scrollArriba();
	}
  
	function ponerEspectaculos() {
	  if (espectaculosMostrados) {
		$("#DOMEspectaculos").show();
	  } else {
		const h1 = document.createElement("h1");
		h1.innerHTML = "Espectaculos";
		const div = document.createElement("div");
		div.setAttribute("id", "zonaEspectaculos");
		DOMEspectaculos.append(h1);
		DOMEspectaculos.append(div);
	  }
  
	  scrollArriba();
  
	  //Llamar a la api
	  llamarAPI();
	  mostrado.append(DOMEspectaculos);
	  espectaculosMostrados = true;
	}
  
	function areasXML() {
	  const request = new XMLHttpRequest();
	  try {
		request.open("GET", "lib/info_areas.xml", false);
		request.send();
		var xml = request.responseXML;
		return xml;
	  } catch (error) {
		console.log("Error");
		return null;
	  }
	}
  
	//Obtener los shows
	async function llamarAPI() {
	  fetch("https://samuelencinas.dev/shows_parque/P01")
		.then((response) => response.json())
		.then((json) => {
		  mostrarEspectaculos(json);
		})
		.catch((error) => mensajeError());
	}
  
	function mensajeError() {
	  const areaHTML = $("#zonaEspectaculos");
	  $(areaHTML).empty();
	  const mensajeError = document.createElement("p");
	  mensajeError.setAttribute("id", "mensajeError");
	  mensajeError.innerHTML = "Error al obtener los datos de los shows";
  
	  areaHTML.append(mensajeError);
	}
  
	//Craftear el HTML de los shows
	function mostrarEspectaculos(espectaculos) {
	  const areaHTML = $("#zonaEspectaculos");
	  areaHTML.empty();
	  const shows = espectaculos.shows[0];
	  Object.entries(shows).forEach((elem) => {
		const areaTematica = elem[0];
		const showsArea = elem[1];
  
		//HTML del área
		const seccionArea = document.createElement("section");
		const nombreArea = document.createElement("a");
		const listaShows = document.createElement("ul");
		const contenidoEspectaculos = document.createElement("div");
  
		if (elem[0] == "PLA") {
		  nombreArea.innerHTML = "Plaza Mayor";
		} else if (elem[0] == "PIR") {
		  nombreArea.innerHTML = "Territorio Pirata";
		} else if (elem[0] == "TFW") {
		  nombreArea.innerHTML = "The Far West";
		} else if (elem[0] == "CCL") {
		  nombreArea.innerHTML = "Cool Children Land";
		} else if (elem[0] == "FUT") {
		  nombreArea.innerHTML = "Calle Futura";
		}
  
		listaShows.setAttribute("class", "listaShows");
		seccionArea.setAttribute("class", "areaShows");
		nombreArea.setAttribute("class", "nombreAreaShows");
  
		areaHTML.append(contenidoEspectaculos);
		contenidoEspectaculos.append(seccionArea);
		seccionArea.append(nombreArea);
		nombreArea.append(listaShows);
  
		//HTML de cada show
		showsArea.forEach((elem) => {
		  const show = document.createElement("li");
		  const listaHoras = document.createElement("ul");
		  const nombreShow = document.createElement("a");
  
		  listaHoras.setAttribute("class", "listaHoras");
		  nombreShow.innerHTML = elem.name;
  
		  show.append(nombreShow);
		  show.append(listaHoras);
		  show.setAttribute("class", "show");
  
		  //HTML horas de cada show
		  if (elem.hours.length != 0) {
			elem.hours.forEach((elem) => {
			  const hora = document.createElement("li");
			  hora.innerHTML = elem;
			  listaHoras.append(hora);
			});
		  } else {
			const mensajeError = document.createElement("li");
			mensajeError.innerHTML = "No disponible";
			listaHoras.append(mensajeError);
		  }
		  listaShows.append(show);
		});
	  });
	}
  
	function scrollArriba() {
	  window.scrollTo({
		top: 0,
		behavior: "smooth",
	  });
	}
  
	//Cargar JSON y un evento q avise q ya esta creado
	async function cargarJSON() {
	  try {
		const respuesta = await fetch("lib/tiempos_espera.json");
		if (respuesta.ok) {
		  const datos = await respuesta.json();
		  const evento = new CustomEvent("datosCargados", { detail: datos });
		  document.dispatchEvent(evento);
		  return datos;
		}
	  } catch (error) {
		console.log("Error al cargar el JSON");
	  }
	}
  
	document.addEventListener(
	  "datosCargados",
	  function (event) {
		tiempos_espera_JSON = event.detail;
		ponerAreas();
	  },
	  false
	);
  
	//Guardar localStorage al cerrar la página
	window.addEventListener("beforeunload", function (event) {
	  localStorage.clear();
	  localStorage.setItem("dato", JSON.stringify(atraccionesFav));
	});
  
	//POST
	$("#enviarSugerencia").on("click", (event) => {
	  event.preventDefault();
	  var correoF = $("#username").val();
	  var sugerenciaF = $("#sugerencia").val();
	  const esEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(correoF);
	  if (esEmail) {
		const obj = {
		  correo: correoF,
		  sugerencia: sugerenciaF,
		};
  
		fetch("https://samuelencinas.dev/sugerencias_parque", {
		  method: "POST",
		  body: JSON.stringify(obj),
		});
  
		$("#username").val("");
		$("#sugerencia").val("");
	  } else {
		alert("¡Correo no válido!");
	  }
	});
  
	//Botones de cambiar de seccion
	$("#segopark").on("click", function () {
	  $(".apartado").hide();
	  $("#irAreas").removeClass("active");
	  $("#irEspectaculos").removeClass("active");
	  $("#irPost").removeClass("active");
	  ponerBienvenida();
	});
  
	$("#irAreas").on("click", function () {
	  $(".apartado").hide();
	  $("#irAreas").addClass("active");
	  $("#irEspectaculos").removeClass("active");
	  $("#irPost").removeClass("active");
	  ponerAreas();
	});
  
	$("#irEspectaculos").on("click", function () {
	  $(".apartado").hide();
	  $("#irEspectaculos").addClass("active");
	  $("#irAreas").removeClass("active");
	  $("#irPost").removeClass("active");
	  ponerEspectaculos();
	});
  
	$("#irPost").on("click", function () {
	  $(".apartado").hide();
	  $("#irPost").addClass("active");
	  $("#irAreas").removeClass("active");
	  $("#irEspectaculos").removeClass("active");
	  ponerSugerencia();
	});
	$("#DOMSugerencias").hide();
});
  