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
                                    plantilla+="<td>"+ valor.cit_HoraInicio +"</td>";
                                    plantilla+="<td>"+ valor.cit_HoraFin +"</td>";
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
                console.log(respuesta);
                misCitasC(); 
            }
        }); 
    }


    function datosDeForm(){

        /* var tdate = new Date(); VERRRRRR   MODIFICAR DKANDKLANDKLANDLA DLANDLNALDNALK
        var dd = tdate.getDate(); 
        dd += 1;
        if(dd < 10){
            dd = "0" + dd;
        }
        var MM = tdate.getMonth(); 
        var yyyy = tdate.getFullYear(); 
        var fecha =  yyyy + "-" + MM + "-" + dd;
        var fechas = fecha.toString();
        console.log(fechas); */

        $('#fecha').attr('min', '2021-12-08');


        $('#HoraInicio').prepend("<option value='16:00' >16:00</option>");
        $('#HoraInicio').prepend("<option value='15:00' >15:00</option>");
        $('#HoraInicio').prepend("<option value='14:00' >14:00</option>");
        $('#HoraInicio').prepend("<option value='13:00' >13:00</option>");
        $('#HoraInicio').prepend("<option value='12:00' >12:00</option>");
        $('#HoraInicio').prepend("<option value='11:00' >11:00</option>");
        $('#HoraInicio').prepend("<option value='10:00' >10:00</option>");
        $('#HoraInicio').prepend("<option value='09:00' >9:00</option>");
        $('#HoraInicio').prepend("<option value='08:00' selected>8:00</option>");

        
        $('#HoraFin').prepend("<option value='17:00' >17:00</option>");
        $('#HoraFin').prepend("<option value='16:00' >16:00</option>");
        $('#HoraFin').prepend("<option value='15:00' >15:00</option>");
        $('#HoraFin').prepend("<option value='14:00' >14:00</option>");
        $('#HoraFin').prepend("<option value='13:00' >13:00</option>");
        $('#HoraFin').prepend("<option value='12:00' >12:00</option>");
        $('#HoraFin').prepend("<option value='11:00' >11:00</option>");
        $('#HoraFin').prepend("<option value='10:00' >10:00</option>");
        $('#HoraFin').prepend("<option value='09:00' >9:00</option>");

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


        


    $('#HoraInicio').change(function(e){validarHora(); habiliatarCrearCita();})
    $('#HoraFin').change(function(e){validarHora(); habiliatarCrearCita()})
    $('#fecha').change(function(e){habiliatarCrearCita();})
    $('#identificacionAsesor').keyup(function(e){habiliatarCrearCita();})
    $('#identificacionCliente').keyup(function(e){habiliatarCrearCita();})

    function validarHora(){
        var HoraI = $('#HoraInicio').val();
        var HoraF = $('#HoraFin').val();
        
        if( HoraI > HoraF){
            alert("La hora de finalizacion de la cita no puede ser anterior a la hora de Inicio");
            $('#HoraFin').val('17:00');
        }else if(HoraI == HoraF){
            alert("La hora de finalizacion de la cita no puede ser la misma que la hora de Inicio");
            $('#HoraFin').val('17:00');
        }

    }

    function habiliatarCrearCita(){
        var HoraI = $('#HoraInicio').val();
        var HoraF = $('#HoraFin').val();
        var fecha = $('#fecha').val();
        var IdntAs = $('#identificacionAsesor').val();
        var IdntCl = $('#identificacionCliente').val();
        
        habilitabtn = 0;
        
        if(HoraI == ""){
            habilitabtn++;
        }
        if(HoraF == ""){
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
        citdat.append('HoraInicio', $('#HoraInicio').val());
        citdat.append('HoraFin', $('#HoraFin').val());
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

                console.log(response);
            }
        }) 
    }



   