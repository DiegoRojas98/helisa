<?php
require_once 'conexion.php';

    class citas_M{

        private $db ;
        private $resultado;

        public function __construct(){
            $this->db = conexion::conexion();
            $this->resultado = array();
        }

        public function get_citasxIdentCliente($identificacion){
            $sql = "Select * from citas where cit_Cliente = '$identificacion'";
            $resultado = $this->db->query($sql);
            while($datos = $resultado->fetch_assoc()){
                $this->citas[] = $datos;
            }
            return $this->citas;
        }

        public function get_citasxIdentAsesor($identificacion){
            $sql = "Select * from citas where cit_Asesor = '$identificacion'";
            $resultado = $this->db->query($sql);
            while($datos = $resultado->fetch_assoc()){
                $this->citas[] = $datos;
            }
            return $this->citas;
        }

        public function get_Citas(){
            $sql = "Select * from citas";
            $resultado = $this->db->query($sql);
            while($datos = $resultado->fetch_assoc()){
                $this->citas[] = $datos;
            }
            return $this->citas;
        }

        public function set_EliminarCita($Id){
            $sql = "CALL eliminar_Cita('$Id')";
            $this->db->query($sql);
        }

    }

?>