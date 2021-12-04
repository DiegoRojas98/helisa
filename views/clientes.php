<!DOCTYPE html>
<html>
    <head>
        <title>usuarios</title>
    </head>
    <body>
        <table style="border:1px solid black">
        <tr>
            <td>Nombres</td>
            <td>Apellido</td>
            <td>Identificacion</td>
            <td>Tipo De Identificacion</td>
            <td>Fecha de creaccion</td>
            <td>Ciudad</td>
            <td>Pais</td>
        </tr>
        <?php if((isset($cldat['usuarios'])) && (count($cldat['usuarios']) > 0)){
            foreach($cldat['usuarios'] as $dato){
                
                echo "<tr>
                        <td>" . $dato['cl_Nombres']. "</td>
                        <td>" . $dato['cl_Apellidos']. "</td>
                        <td>" . $dato['cl_Identificacion']. "</td>
                        <td>" . $dato['cl_Tipoidentificacion']. "</td>
                        <td>" . $dato['cl_Fechacreacion']. "</td>
                        <td>" . $dato['cl_Ciudad']. "</td>
                        <td>" . $dato['cl_Pais']. "</td>
                    </tr>";
            }
            
        }elseif(isset($cldat1)){
            echo "<tr>
                        <td>" . $cldat1['cl_Nombres']. "</td>
                        <td>" . $cldat1['cl_Apellidos']. "</td>
                        <td>" . $cldat1['cl_Identificacion']. "</td>
                        <td>" . $cldat1['cl_Tipoidentificacion']. "</td>
                        <td>" . $cldat1['cl_Fechacreacion']. "</td>
                        <td>" . $cldat1['cl_Ciudad']. "</td>
                        <td>" . $cldat1['cl_Pais']. "</td>
                    </tr>";
            
        }else {
            echo "no se encontraron asesores registrados";
        }?>

        </table>
    </body>
</html>