<?php

    class clientes_C{


        public function __construct(){
            session_start();
            if((isset($_SESSION['Rol'])) && ($_SESSION['Rol'] == 'Cliente')){
                require_once 'model/clientes_M.php';
                $cliente = new clientes_M();
                $cldat1 = $cliente->get_ClientexIdentificacion($_SESSION['Identificacion']);
                require_once 'views/clientes.php';
            }elseif((isset($_SESSION['Rol'])) && ($_SESSION['Rol'] != 'Cliente')){
                require_once 'model/clientes_M.php';
                $cliente = new clientes_M();
                $cldat['usuarios'] = $cliente->get_clientes();
                require_once 'views/clientes.php';
            }
        }

    }









?>