<?php

    class Index_C{

        public function __construct(){
            session_start();
            if(isset($_SESSION['Identificacion'])){
                echo "hola #" . $_SESSION['Identificacion'] . "<br>" . $_SESSION['Rol'];
                require_once 'views/Principal.html';
            }else{
                header('location:Index.php?c=login');
            }
        }



    }





?>