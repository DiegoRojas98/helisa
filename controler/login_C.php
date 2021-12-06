<?php


    class login_C{

        public function __construct(){
            if((isset($_POST['accion'])) && ($_POST['accion'] == 'validarUsuario')){
                $this->validar($_POST['identificacion'],$_POST['password']);
            }else{
                require_once 'views/login.html';
            }
        }


        private function validar($Identificacion,$password){
            require_once 'model/clientes_M.php';
            require_once 'model/asesores_M.php';
            

            $usuarioA = new asesores_M();
            $datosA['usuarios'] = $usuarioA->get_asesores();
            $usuarioB = new clientes_M();
            $datosB['usuarios'] = $usuarioB->get_clientes();

            $validarIdentificacion = false;
            $validarPass = false;

        

            foreach($datosA['usuarios'] as $dato){
                if($dato['as_Identificacion'] == $Identificacion){
                    $validarIdentificacion = true;
                    if($dato["as_Password"] == $password){
                        $validarPass = true;
                        session_start();
                        $_SESSION['Identificacion'] = $dato["as_Identificacion"];
                        $_SESSION['Rol'] = $dato["as_Rol"];
                        $_SESSION['Nombre'] = $dato["as_Nombre"];
                    }
                }
            }

            foreach($datosB['usuarios'] as $datoB){
                if($datoB['cl_Identificacion'] == $Identificacion){
                    $validarIdentificacion = true;
                    if($datoB["cl_Password"] == $password){
                        $validarPass = true;
                        session_start();
                        $_SESSION['Identificacion'] = $datoB["cl_Identificacion"];
                        $_SESSION['Rol'] = $datoB["cl_Rol"];
                        $_SESSION['Nombre'] = $datoB["cl_Nombres"];
                    }
                }
            }

            if($validarIdentificacion == true){
                if($validarPass == true){
                    echo 2;/* usuario admitido */
                }else{
                    echo 0;//contraseña Incorrecta;
                }
            }else{
                echo 1;//la identificacio no se encuentra registrada;
            }
        }

    }



?>