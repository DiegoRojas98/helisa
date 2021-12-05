<?php

    class registro_C{

        public function __construct(){
            if((isset($_POST['accion'])) && ($_POST['accion'] == "RegistroAsesor")){
                $this->registrarA();
            }else if((isset($_POST['accion'])) && ($_POST['accion'] == "RegistroCliente")){
                $this->registrarC();
            }else{
                require_once 'views/registro.html';
            }
            
        }

        public function registrarA(){
            
            $validarIdentificacion = $this->validarIdentificacion($_POST['identificacion']);

            if($validarIdentificacion == true){
                echo 0;/* la identificacion que es un campo unico en BD ya existe por lo tanto no sera registrado  */
            }else {
                require_once 'model/asesores_M.php';
                $asesor = new asesores_M();
                $asesor->set_registrar($_POST['nombre'],$_POST['identificacion'],$_POST['tipoIdentificacion'],$_POST['ansExperiencia'],$_POST['especialidad'],$_POST['password']);
                echo 1;/* el usuario  fue registrado correctamente */
            }  
        }

        public function registrarC(){

            $validarIdentificacion = $this->validarIdentificacion($_POST['identificacion']);

            

            if($validarIdentificacion == true){
                echo 0;/* la identificacion que es un campo unico en BD ya existe por lo tanto no sera registrado  */
            }else {
                require_once 'model/asesores_M.php';
                $cliente = new clientes_M();
                $cliente->set_registrar($_POST['nombres'],$_POST['apellidos'],$_POST['identificacion'],$_POST['tipoIdentificacion'],$_POST['fechacreacion'],$_POST['password'],$_POST['ciudad'],$_POST['pais']);
                echo 1;/* el usuario fue registrado correctamente */
            }  
        }

        private function validarIdentificacion($identificacion){
            require_once 'model/asesores_M.php';
            require_once 'model/clientes_M.php';
            
            $usuarioA = new asesores_M();
            $datosA['usuarios'] = $usuarioA->get_asesores();
            $usuarioB = new clientes_M();
            $datosB['usuarios'] = $usuarioB->get_clientes();

            $validarIdentificacion =false;

            foreach($datosA['usuarios'] as $dato){
                if($dato['as_Identificacion'] == $identificacion){
                    $validarIdentificacion = true;
                }
            }

            foreach($datosB['usuarios'] as $datoB){
                if($datoB['cl_Identificacion'] == $identificacion){
                    $validarIdentificacion = true;
                }
            }

            return $validarIdentificacion;
        }


    }



?>