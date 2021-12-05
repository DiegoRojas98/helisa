<?php

    require_once 'conexion.php';

    class clientes_M{
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

        public function get_ClientexIdentificacion($Identificacion){
            $sql = "Select * from cliente where cl_Identificacion = $Identificacion";
            $resultado = $this->db->query($sql);
            $datouser = $resultado->fetch_assoc();
            return $datouser;
        }

        public function set_registrar($nombres,$apellidos,$identificacion,$tipoidentificacion,$fechacreacion,$password,$ciudad,$pais){
                    $sql = "CALL ingresar_Cliente ('$nombres','$apellidos','$identificacion','$tipoidentificacion','$fechacreacion','$password','$ciudad','$pais')";
                    $this->db->query($sql);
        }   


    }



?>