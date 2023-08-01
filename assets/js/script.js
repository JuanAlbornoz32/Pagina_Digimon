var datosDigimon; // Variable creada para almacenar los datos de los digimon

// Función para traer los datos de la API y mostrarlos a traves de la funcion mostrarDatos
function traerDatos() {
    $.get("https://digimon-api.vercel.app/api/digimon", function(data) {
        datosDigimon = data; 
        mostrarDatos(data);
    });
}

// Función para mostrar los datos de los digimon a traves de una tabla 
function mostrarDatos(data) {
    $("#tabla-digimons").empty();     
    $.each(data, function(index, digimon) {
        var row = $("<tr>");
        var nameCell = $("<td>").text(digimon.name);
        var levelCell = $("<td>").text(digimon.level);
        var imageCell = $("<td>").append($("<img>").attr("src", digimon.img));
        row.append(nameCell);
        row.append(levelCell);
        row.append(imageCell);
        $("#tabla-digimons").append(row);
    });
}

// Se llama a la funcion traerDatos, al momento de cargar la pagina
$(document).ready(function() {
    traerDatos();
});

// Evento para solicitar los datos de un digimon en especifico, a traves del campo "Busca tu Digimon"
$(document).ready(function() {  
  $("#buscarDigimon").submit(function(event) {
    event.preventDefault(); 
    // Se obtiene el nombre del digimon ingresado en el campo "Busca tu Digimon" y almacena en la variable digimonNombre
    var digimonNombre = $(this).find("input[type='search']").val();
    // Se realiza la solicitud a la API para obtener los datos del digimon y almacena en la variable consulta
    var consulta = "https://digimon-api.vercel.app/api/digimon/name/" + digimonNombre;
    $.get(consulta)
      // Si la solitud a la Api fue exitosa, se muestran los datos del digimon a traves de la funcion mostraDatosDigimon
      .done(function(data) {         
        mostrarDatosDigimon(data[0]);
      })
      // Si ocurrio un error en la solicitud a la api, se muestra un alert por pantalla
      .fail(function() {
        alert("Error al buscar el digimon. Vuelva a intentarlo.");
      });
    });
  });

// Función para mostrar los datos del digimon en una tabla
  function mostrarDatosDigimon(digimon) {
    $("#tabla-digimons").empty();     
    var row = $("<tr>");
    var nameCell = $("<td>").text(digimon.name);
    var levelCell = $("<td>").text(digimon.level);
    var imageCell = $("<td>").append($("<img>").attr("src", digimon.img));
    row.append(nameCell);
    row.append(levelCell);
    row.append(imageCell);
    $("#tabla-digimons").append(row);
  }

// Se llama a la funcion traerDatos, a momento de hacer click en el enlace inicio, para así mostrar la tabla completa de digimons
$(".nav-link.active").click(function() {
  traerDatos(); 
});

//Funcion para realizar un cambio de estilo en la tabla de digimon, al hacer click en boton "Estilo tabla"
//Cambio reversible al volver a hacer click en boton "Estilo tabla"
$(document).ready(function() {
  $("#cambiarEstilo").click(function() {
    $("#tabla-digimons").toggleClass("estilo-alternativo");
  });
});