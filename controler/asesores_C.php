<?php
    require_once 'model/asesores_M.php';

    class asesores_C{

        public function __construct(){
            if((isset($_GET['accion'])) && ($_GET['accion'] == 'ObtenerResultados')){
                $this->obtenerResultados();
            }else if((isset($_POST['accion'])) && ($_POST['accion'] == 'eliminar')){
                $this->eliminarAsesor();
            }elseif((isset($_GET['accion'])) && ($_GET['accion'] == 'modificarV')){
                $this->modificarVista();
            }elseif((isset($_POST['accion'])) && ($_POST['accion'] == 'modificarAsesor')){
                $this->modificarAsesor();
            }else{
                require_once 'views/asesores.html';
            }

        }

        private function obtenerResultados(){
                session_start();
                $asesor = new asesores_M();

                if((isset($_SESSION['Rol'])) && ($_SESSION['Rol'] == 'Asesor')){
                    $dat= $asesor->get_AsesorxIdentificacion($_SESSION['Identificacion']);
                }elseif((isset($_SESSION['Rol'])) && ($_SESSION['Rol'] != 'Asesor')){
                    $dat= $asesor->get_asesores();
                };
                echo json_encode($dat);
        }

        private function eliminarAsesor(){
            $asesor = new asesores_M();
            $dat= $asesor->get_AsesorxIdentificacion($_POST['Identificacion']);
            $validarIdentificacion = false;

            foreach($dat as $dato){
                if($dato['as_Identificacion'] == $_POST['Identificacion']){
                    $validarIdentificacion = true;
                }
            }

            if($validarIdentificacion == true){
                $asesor->set_eliminarAsesor($_POST['Identificacion']);
                echo 1;/* se elimino el cliente */
            }else{
                echo 0;/* no se elimino el cliente por que ya no se encontraba en bd lo que quiere decir que fue eliminado con anterioridad */
            }
        }

        private function modificarVista(){
            $asesor = new asesores_M();
            $dat= $asesor->get_AsesorxIdentificacion($_GET['Identificacion']);
            echo json_encode($dat);
        }


        private function modificarAsesor(){

            $asesor = new asesores_M();
            $dat= $asesor->get_AsesorxIdentificacion($_POST['identificacion']);
            $validarIdentificacion = false;

            foreach($dat as $dato){
                if($dato['as_Identificacion'] == $_POST['identificacion']){
                    $validarIdentificacion = true;
                }
            }

            if($validarIdentificacion == true){
                $asesor->set_modificarAsesor($_POST['nombre'],$_POST['identificacion'],$_POST['ansExperiencia'],$_POST['especialidad'],$_POST['password']);
                echo 1;/* se modificao el asesor*/
            }else{
                echo 0;/* no se modificao el asesor por que ya no se encontraba en bd lo que quiere decir que fue eliminado con anterioridad */
            }
        }

        



    }


?>