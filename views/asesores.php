<!DOCTYPE html>
<html>
    <head>
        <title>usuarios</title>
    </head>
    <body>
        <table style="border:1px solid black">
        <tr>
            <td>Nombre</td>
            <td>Identificacion</td>
            <td>Tipo De Identificacion</td>
            <td>Años de experiencia</td>
            <td>especialidad</td>
            <td>hora inicio</td>
            <td>hora fin</td>

        </tr>

        <?php if(count($asdat['usuarios']) == 0){
            echo "no se encontraron asesores registrados";
        }else{

            foreach($asdat['usuarios'] as $dato){
                
                echo "<tr>
                        <td>" . $dato['as_Nombre']. "</td>
                        <td>" . $dato['as_Identificacion']. "</td>
                        <td>" . $dato['as_TipoIdentificacion']. "</td>
                        <td>" . $dato['as_AñosExperiencia']. "</td>
                        <td>" . $dato['as_Especialidad']. "</td>
                        <td>" . $dato['as_HoraInicio']. "</td>
                        <td>" . $dato['as_HoraFin']. "</td>
                    </tr>";
            }
        }?>
        
        </table>
    </body>
</html>