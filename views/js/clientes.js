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
                                plantilla+="<td>Editar /";
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
               console.log(respuesta);
               resultadosTable();
            }
        });  

        
    }
