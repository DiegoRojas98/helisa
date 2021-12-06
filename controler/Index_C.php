<?php

    class Index_C{

        public function __construct(){
            session_start();
            if(isset($_SESSION['Identificacion'])){
                require_once 'views/clientes.html';
            }else{
                header('location:Index.php?c=login');
            }
        }



    }





?>