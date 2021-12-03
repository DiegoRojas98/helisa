<?php   

    class conexion{

        public static function conexion(){

            $conexion = new mysqli("localhost","root","","citas");
            return $conexion;
        }
    }
?>