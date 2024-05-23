$(document).ready(function() {

	var espectaculosMostrados = false;
	var areasMostradas = false;
	var bienvenidaMostrada = false;
	var sugerenciasMostradas = false;

	const DOMAreas = document.createElement("main");
	DOMAreas.setAttribute("id", "DOMAreas");
	DOMAreas.setAttribute("class", "apartado");

	const DOMEspectaculos = document.createElement("main");
	DOMEspectaculos.setAttribute("id", "DOMEspectaculos");
	DOMEspectaculos.setAttribute("class", "apartado");

	const DOMBienvenida = document.createElement("main");
	DOMBienvenida.setAttribute("id", "DOMBienvenida");
	DOMBienvenida.setAttribute("class", "apartado");

	const DOMSugerencias = document.createElement("main");
	DOMSugerencias.setAttribute("id", "DOMSugerencias");
	DOMSugerencias.setAttribute("class", "apartado");

	const mostrado = $('#content');

	ponerBienvenida();

	//Añadir bienvenida
	function ponerBienvenida() {
		if (bienvenidaMostrada) {
			$("#DOMBienvenida").show();
		} else {
			const img = document.createElement("img");
			const div = document.createElement("h1");
			div.setAttribute("id", "bienvenida");
			div.innerHTML = "Bienvenidos a nuestro parque"
			img.setAttribute("id", "imgBienvenida");
			img.setAttribute("src", "../resources/header-bg.jpg");
			DOMBienvenida.append(div);
			DOMBienvenida.append(img);
			mostrado.append(DOMBienvenida);
			bienvenidaMostrada = true;
		}
	}

	//Añadir apartado sugerencias
	function ponerSugerencia(){
		if(sugerenciasMostradas){
			$("#DOMSugerencias").show();
		} else{
			const h1 = document.createElement("h1");
			h1.innerHTML = "Sugerencias";
			DOMSugerencias.append(h1);

			const divSugerencias = document.createElement("div");
			divSugerencias.setAttribute("id", "zonaSugerencias");			
			divSugerencias.innerHTML = "¡Dejanos una sugerencia y ayudanos a mejorar!"

			const zonaFormulario = document.createElement("p")
			zonaFormulario.setAttribute("id", "zonaFormulario");
			const formulario = document.createElement("form");

			const parrafo1 = document.createElement("p");
			const nombreUsuario = document.createElement("label");
			nombreUsuario.innerHTML = "Correo ";
			const datosNombreUsuario = document.createElement("input");
			datosNombreUsuario.setAttribute("type", "text");
			datosNombreUsuario.setAttribute("class", "text-box");
			datosNombreUsuario.setAttribute("autocomplete", "off");
			nombreUsuario.append(datosNombreUsuario);
			parrafo1.append(nombreUsuario);
			parrafo1.setAttribute("class", "parrafo");

			const parrafo2 = document.createElement("p");
			const sugerencia = document.createElement("label");
			sugerencia.innerHTML = "Sugerencia ";
			const datosSugerencia = document.createElement("input");
			datosSugerencia.setAttribute("type", "text");
			datosSugerencia.setAttribute("class", "text-box");
			datosSugerencia.setAttribute("autocomplete", "off");
			sugerencia.append(datosSugerencia);
			parrafo2.append(sugerencia)
			parrafo2.setAttribute("class", "parrafo");

			formulario.append(parrafo1);
			formulario.append(parrafo2);

			zonaFormulario.append(formulario)
			divSugerencias.append(zonaFormulario);

			DOMSugerencias.append(divSugerencias);
			mostrado.append(DOMSugerencias);

			sugerenciasMostradas = true;
		}
	}

	function ponerAreas() {
		if (areasMostradas) {
			$("#DOMAreas").show();
		} else {
			const h1 = document.createElement("h1");
			h1.innerHTML = "Áreas"
			DOMAreas.append(h1);

			const div = document.createElement("div");
			div.setAttribute("id", "zonaAreas");
			DOMAreas.append(div);

			//Obtener XML
			var xml = areasXML();
			var areas = xml.getElementsByTagName("area");

			//Funcion para añadir todas las áreas :D
			const areaHTML = div
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
					var atraccion = atracciones[j].getElementsByTagName("nombre_atraccion")[0];
					var nombreAtraccion = atraccion.firstChild.nodeValue;
					var idAtraccion = "../resources/atracciones/" + atracciones[j].getAttribute("ID") + ".jpg";
					console.log(idAtraccion);

					//Añadir al HTML
          
					const li = document.createElement("li");

					const divAtraccion = document.createElement("div");
					const popUp = document.createElement("a");
					li.append(popUp);
					li.append(divAtraccion);

					const imagenAtraccion = document.createElement("img");
					imagenAtraccion.setAttribute("class", "imgAtraccion");
					imagenAtraccion.setAttribute("src", idAtraccion);
					imagenAtraccion.onerror = function() {
					this.src = '../resources/atracciones/no-image.jpg';
					};
					popUp.append(imagenAtraccion);

					divAtraccion.textContent = nombreAtraccion;
					divAtraccion.setAttribute("class", "nombreAtraccion");

					li.classList.add("atraccion");
					listaAtracciones.append(li);

					const fav = document.createElement("a");
					fav.classList.add("boton");
					fav.innerHTML = "&#9734;"
					divAtraccion.append(fav);
				}

				mostrado.append(DOMAreas);
				areasMostradas = true;
			}

      		//Añadir Favoritos
			$(".boton").on("click", function() {
				$(this).parent(".nombreAtraccion").parent(".atraccion").toggleClass("fav");

				if ($(this).hasClass("favBoton")) {
					$(this).removeClass("favBoton");
					this.innerHTML = "&#9734;"
				} else {
					$(this).addClass("favBoton");
					this.innerHTML = "&#9733;"
				}
			})
		}
	}

	function ponerEspectaculos() {
		if (espectaculosMostrados) {
			$("#DOMEspectaculos").show();
		} else {
			const h1 = document.createElement("h1");
			h1.innerHTML = "Espectaculos"
			const div = document.createElement("div");
			div.setAttribute("id", "zonaEspectaculos");
			DOMEspectaculos.append(h1)
			DOMEspectaculos.append(div);
		}

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
	//POST
	
	/*fetch("https://samuelencinas.dev/sugerencias_parque", {
		method: "POST"
		body: JSON.stringify(obj)
	})
*/

	//Obtener los shows
	async function llamarAPI() {
		fetch("https://samuelencinas.dev/shows_parque/P01")
			.then(response => response.json())
			.then(json => {
				mostrarEspectaculos(json);
			}).catch(error => mensajeError());
	}

	function mensajeError() {
		const areaHTML = $('#zonaEspectaculos');
		$(areaHTML).empty();
		const mensajeError = document.createElement("p");
		mensajeError.innerHTML = "Error al obtener los datos de los shows";
		mensajeError.style.fontWeight = 'bold';
		mensajeError.style.fontSize = '40px';
		areaHTML.append(mensajeError);
	}

	//Craftear el HTML de los shows
	function mostrarEspectaculos(espectaculos) {

		const areaHTML = $('#zonaEspectaculos');
		areaHTML.empty();
		const shows = espectaculos.shows[0];
		Object.entries(shows).forEach(elem => {
			const areaTematica = elem[0];
			const showsArea = elem[1];

			//HTML del área
			const seccionArea = document.createElement("section");
			const nombreArea = document.createElement("p");
     	 	const listaShows = document.createElement("ul");
			nombreArea.innerHTML = elem[0];

			areaHTML.append(seccionArea);
			seccionArea.append(nombreArea);
			nombreArea.append(listaShows);

			//HTML de cada show
			showsArea.forEach(elem => {
				const show = document.createElement("li");
				const listaHoras = document.createElement("ul");

        		show.innerHTML = elem.name;
				show.append(listaHoras);

				//HTML horas de cada show
				if (elem.hours.length != 0) {
					elem.hours.forEach(elem => {
						const hora = document.createElement("li");
						hora.innerHTML = elem;
						listaHoras.append(hora);
					});
				} else {
					const mensajeError = document.createElement("li");
					mensajeError.innerHTML = "No hay horarios disponibles";
					listaHoras.append(mensajeError);
				}
				listaShows.append(show);
			});
		})
	}

	function scrollArriba() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // Para un desplazamiento suave
		});
	}

	//Botones de cambiar de seccion
	$("#segopark").on("click", function() {
		$(".apartado").hide();
		$("#irAreas").removeClass("active");
		$("#irEspectaculos").removeClass("active");
		ponerBienvenida();
		scrollArriba();
	});

	$("#irAreas").on("click", function() {
		$(".apartado").hide();
		$("#irAreas").addClass("active")
		$("#irEspectaculos").removeClass("active");
		$("#irPost").removeClass("active");
		ponerAreas();
		scrollArriba();
	});

	$("#irEspectaculos").on("click", function() {
		$(".apartado").hide();
		$("#irEspectaculos").addClass("active");
		$("#irAreas").removeClass("active");
		$("#irPost").removeClass("active");
		ponerEspectaculos();
		scrollArriba();
	});

	$("#irPost").on("click", function(){
		$(".apartado").hide();
		$("#irPost").addClass("active");
		$("#irAreas").removeClass("active");
		$("#irEspectaculos").removeClass("active");
		ponerSugerencia();
		scrollArriba();
	})
});