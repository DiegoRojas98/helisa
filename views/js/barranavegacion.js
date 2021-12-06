$(document).ready(function(){
    modificandoElementos();

})

function modificandoElementos(){

    $.getJSON("index.php?c=auxiliarDts", "accion=modificandoElementos",
            function (respuesta) {
                var nombre = respuesta.nombre;
                var identificacion= respuesta.identificacion;
                var rol = respuesta.rol;
                console.log(rol);

                $('#mensaje').text('Bienvenido ' +nombre+ '(rol:'+ rol +')');
                if(rol != 'Cliente'){
                    $('#crearCliente').css('display','block');
                }
                if(rol == 'Cliente'){
                    $('#encabezadoClientes').text('Mis datos');
                }else if(rol == "Asesor"){
                    $('#encabezadoAsesores').text('Mis datos');
                }

                if(rol == "Administrador"){
                    $('#crearAsesor').css('display','block');
                }
            }
    );
}