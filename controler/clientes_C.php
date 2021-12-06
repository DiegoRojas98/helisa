<?php
    require_once 'model/clientes_M.php';

    class clientes_C{


        public function __construct(){
            if((isset($_GET['accion'])) && ($_GET['accion'] == 'ObtenerResultados')){
                $this->ObtenerResultados();
            }elseif((isset($_POST['accion'])) && ($_POST['accion'] == 'eliminar')){
                $this->eliminar();
            }else{
                require_once 'views/clientes.html';
            }
        }

        private function ObtenerResultados(){
                session_start();
                $cliente = new clientes_M();
                if((isset($_SESSION['Rol'])) && ($_SESSION['Rol'] == 'Cliente')){
                    $cldat= $cliente->get_ClientexIdentificacion($_SESSION['Identificacion']);
                    echo json_encode($cldat);
                }elseif((isset($_SESSION['Rol'])) && ($_SESSION['Rol'] != 'Cliente')){
                    $cldat = $cliente->get_clientes();
                    echo json_encode($cldat);
                };
        }

        private function eliminar(){
            $cliente = new clientes_M();
            $cldat= $cliente->get_ClientexIdentificacion($_POST['Identificacion']);
            $validarIdentificacion = false;

            foreach($cldat as $dato){
                if($dato['cl_Identificacion'] == $_POST['Identificacion']){
                    $validarIdentificacion = true;
                }
            }

            if($validarIdentificacion == true){
                $cliente->set_eliminarCliente($_POST['Identificacion']);
                echo 1;/* se elimino el cliente */
            }else{
                echo 0;/* no se elimino el cliente por que ya no se encontraba en bd lo que quiere decir que fue eliminado con anterioridad */
            }
        }

    }









?>