$(document).ready(function(){
    modificandoElementos();

})

function modificandoElementos(){

    $.getJSON("index.php?c=auxiliarDts", "accion=modificandoElementos",
            function (respuesta) {
                var nombre = respuesta.nombre;
                var identificacion= respuesta.identificacion;
                var rol = respuesta.rol;

                $('#mensaje').text('Bienvenido '+ nombre);
                if(rol != 'Cliente'){
                    $('#crearCliente').css('display','block');
                }
            }
    );
}