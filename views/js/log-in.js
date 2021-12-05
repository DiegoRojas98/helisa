    $('#password').keyup(function(e){habilitarL();}) //L(log-in)
    $('#Identificacion').keyup(function(e){habilitarL();})

    function habilitarL(){
        var password = $('#password').val();
        var identificacion = $('#Identificacion').val();
        habilitarbtnL = 0;

        if(identificacion == ""){
            habilitarbtnL++;
        }
        if(password == ""){
            habilitarbtnL++;
        }

        if(habilitarbtnL == 0){
            $('#btnLogin').prop('disabled',false);
        }else{
            $('#btnLogin').prop('disabled',true);
        }
    }


    $('#btnLogin').click(function (e) { 
        Login();
    });

    function Login(){
        var datos = new FormData();

        datos.append('identificacion',$('#Identificacion').val());
        datos.append('password',$('#password').val());
        datos.append('accion','validarUsuario');

        $.ajax({
            type: "POST",
            url: 'index.php?c=login',
            data: datos,
            processData: false,
            contentType: false,
            success: function (respuesta) {
                if(respuesta == 2){
                    window.location.href='Index.php';
                }else if(respuesta == 0){
                    $('#Spassword').text('La contraseña no conside con los datos del usuario asociados a la identificacion.');
                    $('#SIdentificacion').text('');
                }else{
                    $('#SIdentificacion').text('La identificacion no se encuentra asociada a uno de nuestros usuarios verifiquela o registrese.');
                    $('#Spassword').text('');
                }
            }
        });  

    }

    $(document).ready(function(){
        var csss = {'background':'rgb(224, 224, 224)','height': '100vh','display': 'flex','justify-content': 'center','align-items': 'center'};
        $('body').css(csss);
    })