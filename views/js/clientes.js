    $(document).ready(function(){
        resultadosTable();

    })


    function resultadosTable(){
        
        $('#registrosCliente').empty();

        $.getJSON("index.php?c=clientes", "accion=ObtenerResultados",
            function (respuesta) {
                var registros = [];

                $.each(respuesta, function (llave, valor) { 
                     if(llave >= 0){
                         var plantilla = "<tr>";

                                plantilla+="<td>"+ valor.cl_Nombres +"</td>";
                                plantilla+="<td>"+ valor.cl_Apellidos +"</td>";
                                plantilla+="<td>"+ valor.cl_Identificacion +"</td>";
                                plantilla+="<td>"+ valor.cl_Tipoidentificacion +"</td>";
                                plantilla+="<td>"+ valor.cl_Fechacreacion +"</td>";
                                plantilla+="<td>"+ valor.cl_Ciudad +"</td>";
                                plantilla+="<td>"+ valor.cl_Pais +"</td>";
                                plantilla+='<td><button type="button" class="btn btn-warning" onclick="modificarV('+valor.cl_Identificacion+')">Modificar</button>  ';
                                plantilla+='<button type="button" class="btn btn-danger" onclick="eliminar('+valor.cl_Identificacion+')">Eliminar</button></td>';
                            
                            plantilla += "</tr>";

                        registros.push(plantilla);
                     }
                });
                $('#registrosCliente').append(registros.join(""));

            }
        );
    }


    function eliminar($identificaion){
        
        var eliminar = new FormData();
        eliminar.append('accion','eliminar');
        eliminar.append('Identificacion',$identificaion);

        $.ajax({
            type: "POST",
            url: 'index.php?c=clientes',
            data: eliminar,
            processData: false,
            contentType: false,
            success: function (respuesta) {
                if(respuesta == 2){
                    alert('eliminaste tu cuenta.')
                    window.location.href='Index.php';
                }
                
               resultadosTable();
            }
        });  
        $('#modificarCliente').css('display','none');
    }

    function modificarV($identificaion){/* visibilisa la tabla modificacion */

        $.getJSON("index.php?c=clientes", "accion=modificarV&Identificacion="+$identificaion,
            function (respuesta) {

                $('#modificarCliente').css('display','block');
                $('#passwordCM').val('');
                $('#paisCM').val(''); 
                ciudadM();


                $.each(respuesta, function (llave, valor) { 
                    $('#nombresCM').val(valor.cl_Nombres);
                    $('#apellidosCM').val(valor.cl_Apellidos);
                    $('#identificacionCM').val(valor.cl_Identificacion);
               });


            }
        );   
    }






    /* evaluar campos modificar cliente */

    $('#nombresCM').keyup(function(e){habilitarMC();}) //CM (cliente modificar)
    $('#apellidosCM').keyup(function(e){habilitarMC();})
    $('#identificacionCM').keyup(function(e){habilitarMC();})
    $('#passwordCM').keyup(function(e){habilitarMC();})
    $('#ciudadAM').change(function(e){habilitarMC();})
    $('#ciudadBM').change(function(e){habilitarMC();})
    $('#ciudadCM').change(function(e){habilitarMC();})
    $('#paisCM').change(function(e){ciudadM(); habilitarMC()})



    function ciudadM(){/* define el elemento select segun la eleccion del pais, muestra la ciudad segun la eleccion*/
        var pais = $('#paisCM').val();
        

        if(pais == ''){
            $('#ciudadAM').css('display','none');
            $('#ciudadBM').css('display','none');
            $('#ciudadCM').css('display','none');   
        }else if(pais == 'Colombia'){
            $('#ciudadAM').css('display','block');
            $('#ciudadBM').css('display','none');
            $('#ciudadCM').css('display','none');
        }else if(pais == 'Peru'){
            $('#ciudadBM').css('display','block');
            $('#ciudadAM').css('display','none');
            $('#ciudadCM').css('display','none');
        }else if(pais == 'Chile'){
            $('#ciudadCM').css('display','block');
            $('#ciudadAM').css('display','none');
            $('#ciudadBM').css('display','none');
        }

        $('#ciudadAM').val('');
        $('#ciudadBM').val('');
        $('#ciudadCM').val('');

    }

    function habilitarMC(){
        var nombres = $('#nombresCM').val();
        var apellidos = $('#apellidosCM').val();
        var identificacion = $('#identificacionCM').val();
        var tipoIdentificacion = $('#tipoIdentificacionCM').val();
        var password = $('#passwordCM').val();
        var ciudadA = $('#ciudadAM').val();
        var ciudadB = $('#ciudadBM').val();
        var ciudadC = $('#ciudadCM').val();
        var pais = $('#paisCM').val();

        var habilitarbtn = 0;

        if(nombres == ""){
            habilitarbtn++;
        }
        if(nombres.length > 30){
            habilitarbtn++;
            $('#SnombresCM').text('Los nombres no deben contener mas de 30 caracteres incluyendo espacios');
        }else{
            $('#SnombresCM').text('')
        }

        if(apellidos == ""){
            habilitarbtn++;
        }
        if(apellidos.length > 30){
            habilitarbtn++;
            $('#SapellidosCM').text('Los apellidos no deben contener mas de 30 caracteres incluyendo espacios');
        }else{
            $('#SapellidosCM').text('')
        }

        if(identificacion == ""){
            habilitarbtn++;
        }
        if(identificacion.length > 25){
            habilitarbtn++;
            $('#SidentificacionCM').text('La identificacion no debe contener mas de 25 caracteres');               
        }else if((identificacion.length > 0) && (identificacion.length < 5)){
            habilitarbtn++;
            $('#SidentificacionCM').text('La identificacion no puede contener menos de 5 digitos y No debera contener ningun signo especial o carcater alfabetico.');               
        }else{
            $('#SidentificacionCM').text('');
        }

        if((ciudadA == "") && (ciudadB == "") && (ciudadC ==  "")){
            habilitarbtn++;
        }
        if(pais == ""){
            habilitarbtn++;
        }

        if(password == ""){
            habilitarbtn++;
        }
        if(password.length > 60){
            $('#SpasswordCM').text('la contraseña no debe contener mas de 60 caracteres');
        }else{
            $('#SpasswordCM').text('');
        }

        if(habilitarbtn == 0){
            $('#btnClienteM').prop('disabled', false);
        }else{
            $('#btnClienteM').prop('disabled', true);
        }

    }



    /* Lanzar modificaciones  */


    $('#btnClienteM').click(function(e){
        modificarCliente();
    })

    function modificarCliente(){
        var clModdat = new FormData();
        clModdat.append('nombres', $('#nombresCM').val());
        clModdat.append('apellidos', $('#apellidosCM').val());
        clModdat.append('identificacion', $('#identificacionCM').val());
        clModdat.append('password', $('#passwordCM').val());
        clModdat.append('pais', $('#paisCM').val());


        if($('#ciudadAM').val() != ''){
            clModdat.append('ciudad', $('#ciudadAM').val());
        }else if($('#ciudadBM').val() != ''){
            clModdat.append('ciudad', $('#ciudadBM').val());
        }else if($('#ciudadCM').val() != ''){
            clModdat.append('ciudad', $('#ciudadCM').val());
        }
        clModdat.append('accion', 'modificarCliente');

        $.ajax({
            type:'POST',
            url: 'index.php?c=clientes',
            data: clModdat,
            processData: false,
            contentType: false,
            success: function (response){
                if(response == 1){
                    alert('modificacion exitosa');
                }else{
                    alert('no se pudo modificar el cliente ya que la identificacion no se encontro en BD.\nEsto debido a que fue eliminado con anteriorida en la BD')
                }
                $('#modificarCliente').css('display','none');
                resultadosTable();
            }
        }) 
    }

    