$(document).ready(function(){
    modificandoElementos();

    var css123 = {'margin':'5px'}
    $('#barranav').css(css123);

})

function modificandoElementos(){

    $.getJSON("index.php?c=auxiliarDts", "accion=modificandoElementos",
            function (respuesta) {
                $('#mensaje').text('Bienvenido ' +respuesta.nombre+ '(rol:'+ respuesta.rol +')');
                if(respuesta.rol != 'Cliente'){
                    $('#crearCliente').css('display','block');
                }
                if(respuesta.rol == 'Cliente'){
                    $('#encabezadoClientes').text('Mis datos');
                }else if(respuesta.rol == "Asesor"){
                    $('#encabezadoAsesores').text('Mis datos');
                }

                if(respuesta.rol == "Administrador"){
                    $('#crearAsesor').css('display','block');
                }
            }
    );
}