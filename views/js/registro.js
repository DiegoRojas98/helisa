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
            $('#Sidentificacion').text('La identificacion no debe contener mas de 25 caracteress');               
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
                    $('#Sidentificacion').text('La identificacion ya se encuentra asociada a uno de nuestros usuarios verifiquela.')
                }else{
                    alert('El usuario fue registrado correctamente.\nAhora puedes ingresar en la aplicacion');
                    window.location.href='Index.php';
                }
            }
        })
    }