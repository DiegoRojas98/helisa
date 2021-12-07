<?php


    class citas_C{

        public function __construct(){
            require_once 'model/citas_M.php';
            if((isset($_GET['accion'])) && ($_GET['accion'] == 'ObtenerResultados')){
                $this->misCitas();
            }elseif((isset($_POST['accion'])) && ($_POST['accion'] == 'eliminar')){
                $this->eliminarCita();
            }elseif((isset($_POST['accion'])) && ($_POST['accion'] == 'CrearCita')){
                $this->CrearCita($_POST['fecha'],$_POST['Hora'],$_POST['identificacionAsesor'],$_POST['identificacionCliente']);
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


        private function crearCita($fecha,$Hora,$identificacionAsesor,$identificacionCliente){
            require_once 'model/asesores_M.php';
            require_once 'model/clientes_M.php';
            
            $usuarioA = new asesores_M();
            $datosA = $usuarioA->get_asesores();
            $usuarioB = new clientes_M();
            $datosB = $usuarioB->get_clientes();

            $validarIdentificacionAs =false;
            $validarIdentificacionCl =false;

            foreach($datosA as $dato){
                if($dato['as_Identificacion'] == $identificacionAsesor){
                    $validarIdentificacionAs = true;
                }
            }

            foreach($datosB as $datoB){
                if($datoB['cl_Identificacion'] == $identificacionCliente){
                    $validarIdentificacionCl = true;
                }
            }
            

            if($validarIdentificacionCl = true && $validarIdentificacionAs = true){
                $tiempoCliente = $this->validarClienteFechaHora($fecha,$Hora,$identificacionCliente);
                $tiempoAsesor = $this->validarAsesorFechaHora($fecha,$Hora,$identificacionAsesor);

                if( $tiempoCliente == false && $tiempoAsesor == false){
                    $citas = new citas_M();
                    $citas->set_CrearCita($fecha,$Hora,$identificacionAsesor,$identificacionCliente);
                            echo 4;

                }else{
                    if($tiempoCliente == true){
                        echo 3;
                    }elseif($tiempoCliente == true){
                        echo 2;
                    }

                }

            }else{
                if($validarIdentificacionAs == false){
                    echo 0;/* la identificacion Asesor es erronea  */
                }elseif($validarIdentificacionCl == false){
                    echo 1;/* la identificacion cliente es erronea */
                }

            }
        }


        private function validarClienteFechaHora($fecha,$Hora,$identificacionCliente){
            $citas = new citas_M();
            $ClienteCitas = $citas->get_citasxIdentCliente($identificacionCliente);
            $validarTiempoCliente = false;
            foreach($ClienteCitas as $dato){
                if($dato['cit_fecha'] == $fecha){
                    if($dato['cit_Hora'] == $Hora){
                        $validarTiempoCliente = true;/* se encontro una cita a la misma hora y fecha */
                    }
                }
            }

            return $validarTiempoCliente;
        }

        private function validarAsesorFechaHora ($fecha,$Hora,$identificacionAsesor){
            $citas = new citas_M();
            $AsesorCitas = $citas->get_citasxIdentAsesor($identificacionAsesor);
            $validarTiempoAsesor = false;
            foreach($AsesorCitas as $dato){
                if($dato['cit_fecha'] == $fecha){
                    if($dato['cit_Hora'] == $Hora){
                        $validarTiempoAsesor = true;/* se encontro una cita a la misma hora y en la misma fecha*/
                    }
                }
            }
            return $validarTiempoAsesor;
        }



    }

?>