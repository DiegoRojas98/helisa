   $(document).ready(function(){
        resultadosTable();

        $('body').css('background','rgb(224, 224, 224);');

    })


    function resultadosTable(){
        
        $('#registrosAsesores').empty();

        $.getJSON("index.php?c=asesores", "accion=ObtenerResultados",
            function (respuesta) {
                var registros = [];

                $.each(respuesta, function (llave, valor) { 
                     if(llave >= 0){
                         var plantilla = "<tr>";

                                plantilla+="<td>"+ valor.as_Nombre +"</td>";
                                plantilla+="<td>"+ valor.as_Identificacion +"</td>";
                                plantilla+="<td>"+ valor.as_TipoIdentificacion +"</td>";
                                plantilla+="<td>"+ valor.as_AñosExperiencia +"</td>";
                                plantilla+="<td>"+ valor.as_Especialidad +"</td>";
                                plantilla+="<td>"+ valor.as_HoraInicio +"</td>";
                                plantilla+="<td>"+ valor.as_HoraFin +"</td>";
                                if(valor.as_Rol == 'Asesor'){
                                plantilla+='<td><button type="button" class="btn btn-warning" onclick="modificarV('+valor.as_Identificacion+')">Modificar</button>  ';
                                plantilla+='<button type="button" class="btn btn-danger" onclick="eliminar('+valor.as_Identificacion+')">Eliminar</button></td>';
                                }
                            
                            plantilla += "</tr>";

                        registros.push(plantilla);
                     }
                });
                $('#registrosAsesores').append(registros.join(""));

            }
        );
    }




    function eliminar($identificaion){
        
        var eliminar = new FormData();
        eliminar.append('accion','eliminar');
        eliminar.append('Identificacion',$identificaion);

        $.ajax({
            type: "POST",
            url: 'index.php?c=asesores',
            data: eliminar,
            processData: false,
            contentType: false,
            success: function (respuesta) {
               resultadosTable();
            }
        });  
        $('#modificarAsesor').css('display','none');
    }



    function modificarV($identificaion){/* visibilisa la tabla modificacion */

        $.getJSON("index.php?c=asesores", "accion=modificarV&Identificacion="+$identificaion,
            function (respuesta) {

                $('#modificarAsesor').css('display','block');
                $('#passwordM').val('');
                $('#especialidadM').val('');


                $.each(respuesta, function (llave, valor) { 
                    $('#nombreM').val(valor.as_Nombre);
                    $('#identificacionM').val(valor.as_Identificacion);
                    $('#ansExperienciaM').val(valor.as_AñosExperiencia);
               });

            }
        );   
    }


    $('#nombreM').keyup(function(e){habilitarMA();}) //MA (modificarasesor)
    $('#ansExperienciaM').keyup(function(e){habilitarMA();})
    $('#especialidadM').change(function(e){habilitarMA();})
    $('#passwordM').keyup(function(e){habilitarMA();})

    function habilitarMA(){
        var nombre = $('#nombreM').val();
        var ansExperiencia = $('#ansExperienciaM').val();
        var especialidad = $('#especialidadM').val();
        var password = $('#passwordM').val();

        var habilitarbtn = 0;

        if(nombre == ""){
            habilitarbtn++;
        }
        if(nombre.length > 55){
            habilitarbtn++;
            $('#SnombreM').text('El nombre no debe contener mas de 55 caracteres incluyendo espacios');
        }else{
            $('#SnombreM').text('')
        }

        if(especialidad == ""){
            habilitarbtn++;
        }

        if(ansExperiencia == ""){
            habilitarbtn++;
        }
        if(ansExperiencia > 70){
            habilitarbtn++;
            $('#SansExperienciaM').text('los años de experiencia no deben ser mayores a 70');
        }else{
            $('#SansExperienciaM').text('');
        }

        if(password == ""){
            habilitarbtn++;
        }
        if(password.length > 60){
            $('#SpasswordM').text('la contraseña no debe contener mas de 60 caracteres');
        }else{
            $('#SpasswordM').text('');
        }

        if(habilitarbtn == 0){
            $('#btnAsesorM').prop('disabled', false);
        }else{
            $('#btnAsesorM').prop('disabled', true);
        }

    }


    /* Lanzar modificaciones  */

    $('#btnAsesorM').click(function(e){
        modificarAsesor();
    })

    function modificarAsesor(){
        var dat = new FormData();
        dat.append('nombre', $('#nombreM').val());
        dat.append('identificacion', $('#identificacionM').val());
        dat.append('password', $('#passwordM').val());
        dat.append('especialidad', $('#especialidadM').val());
        dat.append('ansExperiencia', $('#ansExperienciaM').val());
        dat.append('accion', 'modificarAsesor');


        $.ajax({
            type:'POST',
            url: 'index.php?c=asesores',
            data: dat,
            processData: false,
            contentType: false,
            success: function (response){
                if(response == 1){
                    alert('modificacion exitosa');
                }else{
                    alert('no se pudo modificar el aseor ya que la identificacion no se encontro en BD.\nEsto debido a que fue eliminado con anteriorida en la BD')
                }
                $('#modificarAsesor').css('display','none');
                resultadosTable();
            }
        }) 
    }




     /* Funciones para habilitar el boton de registro para el formulario Asesor */
     $('#nombre').keyup(function(e){habilitarRA();}) //RA (registro asesor)
     $('#identificacion').keyup(function(e){habilitarRA();})
     $('#tipoIdentificacion').change(function(e){habilitarRA();})
     $('#ansExperiencia').keyup(function(e){habilitarRA();})
     $('#especialidad').change(function(e){habilitarRA();})
     $('#password').keyup(function(e){habilitarRA();})
 
     function habilitarRA(){
         var nombre = $('#nombre').val();
         var identificacion = $('#identificacion').val();
         var tipoIdentificacion = $('#tipoIdentificacion').val();
         var ansExperiencia = $('#ansExperiencia').val();
         var especialidad = $('#especialidad').val();
         var password = $('#password').val();
 
         var habilitarbtn = 0;
 
         if(nombre == ""){
             habilitarbtn++;
         }
         if(nombre.length > 55){
             habilitarbtn++;
             $('#Snombre').text('El nombre no debe contener mas de 55 caracteres incluyendo espacios');
         }else{
             $('#Snombre').text('')
         }
 
         if(identificacion == ""){
             habilitarbtn++;
         }
         if(identificacion.length > 25){
             habilitarbtn++;
             $('#Sidentificacion').text('La identificacion no debe contener mas de 25 caracteres');               
         }else if((identificacion.length > 0) && (identificacion.length < 5)){
             habilitarbtn++;
             $('#Sidentificacion').text('La identificacion no puede contener menos de 5 digitos y No debera contener ningun signo especial o carcater alfabetico.');               
         }else{
             $('#Sidentificacion').text('');
         }
 
         if(tipoIdentificacion == ""){
             habilitarbtn++;
         }
         if(especialidad == ""){
             habilitarbtn++;
         }
 
         if(ansExperiencia == ""){
             habilitarbtn++;
         }
         if(ansExperiencia > 70){
             habilitarbtn++;
             $('#SansExperiencia').text('los años de experiencia no deben ser mayores a 70');
         }else{
             $('#SansExperiencia').text('');
         }
 
         if(password == ""){
             habilitarbtn++;
         }
         if(password.length > 60){
             $('#Spassword').text('la contraseña no debe contener mas de 60 caracteres');
         }else{
             $('#Spassword').text('');
         }
 
         if(habilitarbtn == 0){
             $('#btnAsesor').prop('disabled', false);
         }else{
             $('#btnAsesor').prop('disabled', true);
         }
 
     }
 
 
     /* funiones para envio de datos */
     $('#btnAsesor').click(function(e){
         insertAs();
     })
 
     function insertAs(){
 
         var asdat = new FormData();
         asdat.append('nombre', $('#nombre').val());
         asdat.append('identificacion', $('#identificacion').val());
         asdat.append('tipoIdentificacion', $('#tipoIdentificacion').val());
         asdat.append('ansExperiencia', $('#ansExperiencia').val());
         asdat.append('especialidad', $('#especialidad').val());
         asdat.append('password', $('#password').val());
         asdat.append('accion', 'RegistroAsesor');
 
         $.ajax({
             type:'POST',
             url: 'index.php?c=registro',
             data: asdat,
             processData: false,
             contentType: false,
             success: function (response){
                 if(response == 0){
                     $('#Sidentificacion').text('La identificacion ya se encuentra asociada a uno de nuestros usuarios verifiquela.');
                 }else{
                     alert('El usuario fue registrado correctamente.\nAhora puodra ingresar en la aplicacion');
                     resultadosTable();
                 }
             }
         })
     }