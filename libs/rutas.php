<?php /* validador de rutas */
    
    

    function cargarControlador($controlador){
        $archivoControlador = "controler/" . $controlador . ".php";

        if(!is_file($archivoControlador)){
            $archivoControlador = "controler/" . "login". ".php";
            $controlador =  "login";
        }

        require_once "$archivoControlador";
        $control  = new $controlador();
        return $control;
    }

?>