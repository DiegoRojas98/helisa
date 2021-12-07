    $('#nombresC').keyup(function(e){habilitarRC();}) //RC (registro clientes)
    $('#apellidosC').keyup(function(e){habilitarRC();})
    $('#identificacionC').keyup(function(e){habilitarRC();})
    $('#tipoIdentificacionC').change(function(e){habilitarRC();})
    $('#passwordC').keyup(function(e){habilitarRC();})
    $('#ciudadA').change(function(e){habilitarRC();})
    $('#ciudadB').change(function(e){habilitarRC();})
    $('#ciudadC').change(function(e){habilitarRC();})
    $('#paisC').change(function(e){ciudad(); habilitarRC()})



    function ciudad(){/* define el elemento select segun la eleccion del pais, muestra la ciudad segun la eleccion*/
        var pais = $('#paisC').val();

        if(pais == ''){
            $('#ciudadA').css('display','none');
            $('#ciudadB').css('display','none');
            $('#ciudadC').css('display','none');   
        }else if(pais == 'Colombia'){
            $('#ciudadA').css('display','block');
            $('#ciudadB').css('display','none');
            $('#ciudadC').css('display','none');
        }else if(pais == 'Peru'){
            $('#ciudadB').css('display','block');
            $('#ciudadA').css('display','none');
            $('#ciudadC').css('display','none');
        }else if(pais == 'Chile'){
            $('#ciudadC').css('display','block');
            $('#ciudadA').css('display','none');
            $('#ciudadB').css('display','none');
        }

        $('#ciudadA').val('');
        $('#ciudadB').val('');
        $('#ciudadC').val('');

    }

    function habilitarRC(){
        var nombres = $('#nombresC').val();
        var apellidos = $('#apellidosC').val();
        var identificacion = $('#identificacionC').val();
        var tipoIdentificacion = $('#tipoIdentificacionC').val();
        var password = $('#passwordC').val();
        var ciudadA = $('#ciudadA').val();
        var ciudadB = $('#ciudadB').val();
        var ciudadC = $('#ciudadC').val();
        var pais = $('#paisC').val();

        var habilitarbtn = 0;

        if(nombres == ""){
            habilitarbtn++;
        }
        if(nombres.length > 30){
            habilitarbtn++;
            $('#SnombresC').text('Los nombres no deben contener mas de 30 caracteres incluyendo espacios');
        }else{
            $('#SnombresC').text('')
        }

        if(apellidos == ""){
            habilitarbtn++;
        }
        if(apellidos.length > 30){
            habilitarbtn++;
            $('#SapellidosC').text('Los apellidos no deben contener mas de 30 caracteres incluyendo espacios');
        }else{
            $('#SapellidosC').text('')
        }

        if(identificacion == ""){
            habilitarbtn++;
        }
        if(identificacion.length > 25){
            habilitarbtn++;
            $('#SidentificacionC').text('La identificacion no debe contener mas de 25 caracteres');               
        }else if((identificacion.length > 0) && (identificacion.length < 5)){
            habilitarbtn++;
            $('#SidentificacionC').text('La identificacion no puede contener menos de 5 digitos y No debera contener ningun signo especial o carcater alfabetico.');               
        }else{
            $('#SidentificacionC').text('');
        }

        if(tipoIdentificacion == ""){
            habilitarbtn++;
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
            $('#SpasswordC').text('la contraseña no debe contener mas de 60 caracteres');
        }else{
            $('#SpasswordC').text('');
        }

        if(habilitarbtn == 0){
            $('#btnCliente').prop('disabled', false);
        }else{
            $('#btnCliente').prop('disabled', true);
        }

    }


    /* funiones para envio de datos */
    $('#btnCliente').click(function(e){
        insertCl();
    })

    function insertCl(){

        var cldat = new FormData();
        cldat.append('nombres', $('#nombresC').val());
        cldat.append('apellidos', $('#apellidosC').val());
        cldat.append('identificacion', $('#identificacionC').val());
        cldat.append('tipoIdentificacion', $('#tipoIdentificacionC').val());
        cldat.append('password', $('#passwordC').val());
        cldat.append('pais', $('#paisC').val());

        if($('#ciudadA').val() != ""){
            cldat.append('ciudad', $('#ciudadA').val());
        }else if($('#ciudadB').val() != ''){
            cldat.append('ciudad', $('#ciudadB').val());
        }else if($('#ciudadC').val() != ''){
            cldat.append('ciudad', $('#ciudadC').val());
        }

        var tdate = new Date();
        var dd = tdate.getDate(); 
        var MM = tdate.getMonth(); 
        var yyyy = tdate.getFullYear(); 
        var fecha =  yyyy + "-" + MM + "-" + dd;

        cldat.append('fechacreacion', fecha);
        cldat.append('accion', 'RegistroCliente');

        $.ajax({
            type:'POST',
            url: 'index.php?c=registro',
            data: cldat,
            processData: false,
            contentType: false,
            success: function (response){

                if(response == 0){
                    $('#SidentificacionC').text('La identificacion ya se encuentra asociada a uno de nuestros usuarios verifiquela.')
                }else{
                    alert('El usuario fue registrado correctamente.\nAhora puede ingresar en la aplicacion');
                    window.location.href='Index.php';
                }
            }
        }) 
    }