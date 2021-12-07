    $(document).ready(function(){

        misCitasC();
        datosDeForm();

    })

    function misCitasC(){
        $('#misCitas').empty();
        $.getJSON("index.php?c=citas", "accion=ObtenerResultados",
                function (respuesta) {
                    var registros = [];

                    $.each(respuesta, function (llave, valor) { 
                        if(llave >= 0){
                            var plantilla = "<tr>";

                                    plantilla+="<th>"+ valor.cit_Id +"</th>";
                                    plantilla+="<td>"+ valor.cit_fecha+"</td>";
                                    plantilla+="<td>"+ valor.cit_Hora +"</td>";
                                    plantilla+="<td>"+ valor.cit_Asesor +"</td>";
                                    plantilla+="<td>"+ valor.cit_Cliente +"</td>";
                                    plantilla+='<td><button type="button" class="btn btn-danger" onclick="eliminarCita('+valor.cit_Id+')">Eliminar</button></td>';

                            registros.push(plantilla);
                        }
                    });
                    $('#misCitas').append(registros.join(""));
                }
            );
    }


    function eliminarCita($id){

        var eliminar = new FormData();
        eliminar.append('accion','eliminar');
        eliminar.append('Id',$id);

        $.ajax({
            type: "POST",
            url: 'index.php?c=citas',
            data: eliminar,
            processData: false,
            contentType: false,
            success: function (respuesta) {
                misCitasC(); 
            }
        }); 
    }


    function datosDeForm(){

        $('#fecha').attr('min', '2021-12-08');


        $('#Hora').prepend("<option value='16:00' >16:00</option>");
        $('#Hora').prepend("<option value='15:00' >15:00</option>");
        $('#Hora').prepend("<option value='14:00' >14:00</option>");
        $('#Hora').prepend("<option value='13:00' >13:00</option>");
        $('#Hora').prepend("<option value='12:00' >12:00</option>");
        $('#Hora').prepend("<option value='11:00' >11:00</option>");
        $('#Hora').prepend("<option value='10:00' >10:00</option>");
        $('#Hora').prepend("<option value='09:00' >9:00</option>");
        $('#Hora').prepend("<option value='08:00' selected>8:00</option>");

        $.getJSON("index.php?c=auxiliarDts", "accion=modificandoElementos",
            function (respuesta) {
                if(respuesta.rol == "Cliente"){
                    $('#identificacionCliente').val(respuesta.identificacion);
                    $('#identificacionCliente').prop('disabled', true);
                }else{
                    $('#identificacionAsesor').val(respuesta.identificacion);
                    $('#identificacionAsesor').prop('disabled', true);
                }
            }
        );
    }


        


    $('#Hora').change(function(e){ habiliatarCrearCita();})
    $('#fecha').change(function(e){habiliatarCrearCita();})
    $('#identificacionAsesor').keyup(function(e){habiliatarCrearCita();})
    $('#identificacionCliente').keyup(function(e){habiliatarCrearCita();})


    function habiliatarCrearCita(){
        var Hora = $('#Hora').val();
        var fecha = $('#fecha').val();
        var IdntAs = $('#identificacionAsesor').val();
        var IdntCl = $('#identificacionCliente').val();
        
        habilitabtn = 0;
        
        if(Hora == ""){
            habilitabtn++;
        }
        if(fecha == ""){
            habilitabtn++;
        }
        if(IdntAs == ""){
            habilitabtn++;
        }
        if(IdntAs.length > 25){
            habilitabtn++;
            $('#SidentificacionAsesor').text('La identificacion no debe contener mas de 25 caracteres');               
        }else if((IdntAs.length > 0) && (IdntAs.length < 5)){
            habilitabtn++;
            $('#SidentificacionAsesor').text('La identificacion no puede contener menos de 5 digitos y No debera contener ningun signo especial o carcater alfabetico.');               
        }else{
            $('#SidentificacionAsesor').text('');
        }

        if(IdntCl == ""){
            habilitabtn++;
        }
        if(IdntCl.length > 25){
            habilitabtn++;
            $('#SidentificacionCliente').text('La identificacion no debe contener mas de 25 caracteres');               
        }else if((IdntCl.length > 0) && (IdntCl.length < 5)){
            habilitabtn++;
            $('#SidentificacionCliente').text('La identificacion no puede contener menos de 5 digitos y No debera contener ningun signo especial o carcater alfabetico.');               
        }else{
            $('#SidentificacionCliente').text('');
        }



        if(habilitabtn == 0){
            $('#btnCita').prop('disabled' , false);
        }else{
            $('#btnCita').prop('disabled' , true);
        }
    }


    $('#btnCita').click(function(e){ validarDatosCita();})

    function validarDatosCita(){
        
        var citdat = new FormData();
        citdat.append('fecha', $('#fecha').val());
        citdat.append('Hora', $('#Hora').val());
        citdat.append('identificacionAsesor', $('#identificacionAsesor').val());
        citdat.append('identificacionCliente', $('#identificacionCliente').val());
        citdat.append('accion', 'CrearCita');


        $.ajax({
            type:'POST',
            url: 'index.php?c=citas',
            data: citdat,
            processData: false,
            contentType: false,
            success: function (response){
                if(response == 0){
                    $('#SidentificacionAsesor').text('La identificaion ingresada no coincide con ninguna identificacion de nuestros Asesores.');
                }else if(response == 1){
                    $('#SidentificacionCliente').text('La identificaion ingresada no coincide con ninguna identificacion de nuestros Clientes.');
                }else if(response == 2){
                    $('#Smensaje').text('La hora de la cita elegida ya se encuentra ocupada para el Asesor, por favor elige otra en diferente hora o dia.');
                }else if(response == 3){
                    $('#Smensaje').text('La hora de la cita elegida ya se encuentra ocupada para el Cliente, por favor elige otra en diferente hora o dia.');
                }else{
                    $('#Smensaje').text('');
                }
                misCitasC()

            }
        }) 
    }



   