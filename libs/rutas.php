<?php /* validador de rutas */
    
    

    function cargarControlador($controlador){
        $Nombrecontrolador = $controlador . "_C";
        $archivoControlador = "controler/" . $controlador . "_C.php";

        if(!is_file($archivoControlador)){
            $archivoControlador = "controler/Index_C.php";
            $Nombrecontrolador =  "Index_C";
        }

        require_once "$archivoControlador";
        $control  = new $Nombrecontrolador();
        return $control;
    }

?>