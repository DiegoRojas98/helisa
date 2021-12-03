<?php
    require_once 'libs/rutas.php';

    if(isset($_GET['c'])){
        $controlador = cargarControlador($_GET['c']);        
        
    }else{
        $controlador = cargarControlador('');
    }


?>