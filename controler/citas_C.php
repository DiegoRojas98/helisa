<?php


    class citas_C{

        public function __construct(){
            require_once 'model/citas_M.php';
            if((isset($_GET['accion'])) && ($_GET['accion'] == 'ObtenerResultados')){
                $this->misCitas();
            }elseif((isset($_POST['accion'])) && ($_POST['accion'] == 'eliminar')){
                $this->eliminarCita();
            }elseif((isset($_POST['accion'])) && ($_POST['accion'] == 'CrearCita')){
                $this->CrearCita();
            }else{
                require_once 'views/citas.html';
            }
        }

        private function misCitas(){
            session_start();
            if($_SESSION['Rol'] == "Cliente"){
                $citas = new citas_M();
                $misCitas = $citas->get_citasxIdentCliente($_SESSION['Identificacion']);
            }else{
                $citas = new citas_M();
                $misCitas = $citas->get_citasxIdentAsesor($_SESSION['Identificacion']);
            }
            
            echo json_encode($misCitas);
        }


        private function eliminarCita(){
            $citas = new citas_M();
            
            $dat = $citas->get_Citas();
            $validarId = false;

            foreach($dat as $dato){
                if($dato['cit_Id'] == $_POST['Id']){
                    $validarId = true;
                }
            }

            if($validarId == true){
                $citas->set_EliminarCita($_POST['Id']);
                echo 1;/* La cita se elimino con exito */
            }else{
                echo 0;/* La cita no se puede eliminar por que no se encontro el ID en BD */
            }
        }


        private function crearCita(){
            
        }
    }
   


?>