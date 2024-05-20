$(document).ready(function() {

	var espectaculosMostrados = false;
	var areasMostradas = false;
	var bienvenidaMostrada = false;

	const DOMAreas = document.createElement("main");
	DOMAreas.setAttribute("id", "DOMAreas");
	DOMAreas.setAttribute("class", "apartado");

	const DOMEspectaculos = document.createElement("main");
	DOMEspectaculos.setAttribute("id", "DOMEspectaculos");
	DOMEspectaculos.setAttribute("class", "apartado");

	const DOMBienvenida = document.createElement("main");
	DOMBienvenida.setAttribute("id", "DOMBienvenida");
	DOMBienvenida.setAttribute("class", "apartado");

	const mostrado = $('#body');

	ponerBienvenida();

	function ponerBienvenida() {
		if (bienvenidaMostrada) {
			$("#DOMBienvenida").show();
		} else {
			const h1 = document.createElement("h1");
			h1.innerHTML = "Bienvenida"
			DOMBienvenida.append(h1);
			mostrado.append(DOMBienvenida);
			bienvenidaMostrada = true;
		}
	}

	function ponerAreas() {
		if (areasMostradas) {
			$("#DOMAreas").show();
		} else {
			const h1 = document.createElement("h1");
			h1.innerHTML = "Areas";
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
				const elem = document.createElement("p");
				const listaAtracciones = document.createElement("ul");

				elem.style.fontWeight = 'bold';
				elem.style.fontSize = "40px";

				areaHTML.append(seccionArea);
				seccionArea.append(elem);
				elem.append(nombre);
				elem.append(listaAtracciones);

				//Obtener nombres de atracciones
				var atracciones = areas[i].getElementsByTagName("atraccion");

				for (var j = 0; j < atracciones.length; j++) {
					var atraccion = atracciones[j].getElementsByTagName("nombre_atraccion")[0];
					var nombreAtraccion = atraccion.firstChild.nodeValue;

					//Añadir al HTML
					const li = document.createElement("li");
					li.classList.add("atraccion");
					li.textContent = nombreAtraccion;
					li.style.fontWeight = "normal";
					li.style.fontSize = "20px";
					listaAtracciones.append(li);

					const fav = document.createElement("i");
					fav.classList.add("boton");
					fav.innerHTML = "&#9734;"
					li.append(fav);
				}

				mostrado.append(DOMAreas);
				areasMostradas = true;
			}

      		//Añadir Favoritos
			$(".boton").on("click", function() {
				console.log("fav")
				$(this).parent(".atraccion").toggleClass("fav");

				if ($(this).hasClass("fav")) {
					$(this).removeClass("fav");
					this.innerHTML = "&#9734;"
				} else {
					$(this).addClass("fav");
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

	//Botones de cambiar de seccion
	$("#irBienvenida").on("click", function() {
		$(".apartado").hide();
		ponerBienvenida();
	});

	$("#irAreas").on("click", function() {
		$(".apartado").hide();
		ponerAreas();
	});

	$("#irEspectaculos").on("click", function() {
		$(".apartado").hide();
		ponerEspectaculos();
	});
});