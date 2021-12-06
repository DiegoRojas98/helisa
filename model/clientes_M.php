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
            $sql = "Select * from cliente where cl_Identificacion = '$Identificacion'";
            $resultado = $this->db->query($sql);
            while($datos = $resultado->fetch_assoc()){
                $this->usuarios[] = $datos;
            };
            return $this->usuarios;
        }

        public function set_registrar($nombres,$apellidos,$identificacion,$tipoidentificacion,$fechacreacion,$password,$ciudad,$pais){
            $sql = "CALL ingresar_Cliente ('$nombres','$apellidos','$identificacion','$tipoidentificacion','$fechacreacion','$password','$ciudad','$pais')";
            $this->db->query($sql);
        }  
        
        public function set_eliminarCliente($Identificacion){
            $sql = "CALL eliminar_Cliente('$Identificacion')";
            $this->db->query($sql);
        }

        public function set_modificarCliente($nombres,$apellidos,$identificacion,$password,$ciudad,$pais){
            $sql = "CALL modificar_Cliente ('$nombres','$apellidos','$identificacion','$password','$ciudad','$pais')";
            $this->db->query($sql);
        }


    }



?>