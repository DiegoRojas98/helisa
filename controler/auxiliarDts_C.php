<?php

    class auxiliarDts_C{

        public function __construct(){
            if((isset($_GET['accion'])) && ($_GET['accion'] == 'modificandoElementos')){
                session_start();
            $resultado = array('nombre' => $_SESSION['Nombre'], 'identificacion' => $_SESSION['Identificacion'], 'rol' => $_SESSION['Rol']);
           
            echo json_encode($resultado);
            }
        }
        
        private function ObtenerMisDatos(){
            
    }
    }





?>