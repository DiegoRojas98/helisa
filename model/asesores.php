<?php

    require_once 'conexion.php';

    class asesores{
        private $db ;
        private $resultado;

        public function __construct(){
            $this->db =  conexion::conexion();
            $this->resultado = array();
        }

        public function get_asesores(){
            $sql = "select * from asesor";
            $resultado = $this->db->query($sql);
            while($datos = $resultado->fetch_assoc()){
                $this->usuarios[] = $datos;
            }
            return $this->usuarios;
        }

    }



?>
