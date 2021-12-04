<?php

    class cerrarSesion_C{


        public function __construct(){
            session_start();
            session_destroy();
            header('location:Index.php');
        }
    }



?>