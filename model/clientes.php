<?php

    require_once 'conexion.php';

    class clientes{
        private $db ;
        private $resultado;

        public function __construct(){
            $this->db = conexion::conexion();
            $this->resultado = array();
        }

        public function get_clientes(){
            $sql = "select * from cliente";
            $resultado = $this->db->query($sql);
            while($datos = $resultado->fetch_assoc()){
                $this->usuarios[] = $datos;
            }
            return $this->usuarios;
        }

    }



?>