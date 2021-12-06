<?php

    require_once 'conexion.php';

    class asesores_M{
        private $db ;
        private $resultado;

        public function __construct(){
            $this->db = conexion::conexion();
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

        public function set_registrar($nombre,$identificacion,$tipoIdentificacion,$ansExperiencia,$especialidad,$password){
            $sql = "CALL ingresar_Asesor ('$nombre','$identificacion','$tipoIdentificacion','$ansExperiencia','$especialidad','$password')";
            $this->db->query($sql);
        }

        public function get_AsesorxIdentificacion($identificacion){
            $sql = "select * from asesor where as_Identificacion = '$identificacion'";
            $resultado = $this->db->query($sql);
            while($datos = $resultado->fetch_assoc()){
                $this->usuarios[] = $datos;
            }
            return $this->usuarios;
        }

        public function set_eliminarAsesor($identificacion){
            $sql = "CALL eliminar_Asesor('$identificacion')";
            $this->db->query($sql);
        }

        public function set_modificarAsesor($nombre,$identificacion,$añosExperiencia,$especialidad,$password){
            $sql = "CALL modificar_Asesor('$nombre','$identificacion','$añosExperiencia','$especialidad','$password')";
            $this->db->query($sql);
        }

    }



?>
