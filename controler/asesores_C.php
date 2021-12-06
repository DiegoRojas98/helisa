<?php

    class asesores_C{

        public function __construct(){
            
            require_once 'model/asesores_M.php';
            $asesor = new asesores_M();
            $asdat['usuarios']= $asesor->get_asesores();

            require_once 'views/asesores.html';
        }



    }


?>