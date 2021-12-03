<?php


    class login{

        public function __construct(){
            if(isset($_POST['Identificacion'])){
                $this->validar($_POST['Identificacion'],$_POST['password']);
            }else{  
                require_once 'views/login.html';
            }
        }


        public function validar($Identificacion,$password){
            require_once 'model/clientes.php';
            require_once 'model/asesores.php';

            $usuarioA = new asesores();
            $datosA['usuarios'] = $usuarioA->get_asesores();
            $usuarioB = new clientes();
            $datosB['usuarios'] = $usuarioB->get_clientes();

            $validarIdentificacion = false;
            $validarPass = false;

        

            foreach($datosA['usuarios'] as $dato){
                if($dato['as_Identificacion'] == $Identificacion){
                    $validarIdentificacion = true;
                    if($dato["as_Password"] == $password){
                        $validarPass = true;
                    }
                }
            }

            foreach($datosB['usuarios'] as $datoB){
                if($datoB['cl_Identificacion'] == $Identificacion){
                    $validarIdentificacion = true;
                    if($datoB["cl_Password"] == $password){
                        $validarPass = true;
                    }
                }
            }

            if($validarIdentificacion == true){
                if($validarPass == true){
                    echo "Bienvenido";
                }else{
                    echo "contraseña Incorrecta";
                }
            }else{
                echo "la identificacio no se encuentra registrada";
            }
        }

    }



?>