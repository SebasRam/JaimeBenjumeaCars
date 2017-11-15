<?php	
	
    //Datos de Conexion a la base de datos de MySql
    $username="root";
	$password="";
	$servername="localhost";
	$db="db_jaimealbertobenjumea";  
	
try {
	//Se crea la conexion al servidor de base de datos
    $conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
	
	
	
//Se verifica que llegue el parámetro de peticion
if(isset($_REQUEST["servicio"])){
  
    //Adicionar un nuevo vehiculo
    if($_REQUEST["servicio"] == "AdicionarNuevoVehiculo" ){      	
   $vehiculoAdicionar = (array)json_decode($_POST["vehiculo"]);     
   
	    $tipoVehiculoId = $vehiculoAdicionar['tipoVehiculoId'];		
		$marcaId =  $vehiculoAdicionar['marcaId'];
		$modeloId = $vehiculoAdicionar['modeloId'];
		$anio = $vehiculoAdicionar['anio'];
		$descripcion =  $vehiculoAdicionar['descripcion'];
		$precio  =  $vehiculoAdicionar['precio'];
		
       $conn->beginTransaction();      
	   $sql = "INSERT INTO vehiculos (tipoVehiculoId, marcaId, modeloId, anio, descripcion, precio) VALUES ('$tipoVehiculoId', '$marcaId', '$modeloId', '$anio','$descripcion','$precio')";    
       $conn->exec($sql);
	   $conn->commit();   
	   echo "Se ha adicionado el vehiculo satisfactoriamente";
       exit(); 
 
	
 
 
 
 //Consultar los vehiculos existentes 
    }else if($_REQUEST["servicio"] == "ConsultarVehiculosExistentes" ){     
	  $conn->beginTransaction();  
      $statement=$conn->prepare("select mar.nombre as marca,mode.nombre as modelo, veh.anio as anio, veh.estado as estado from vehiculos as veh join marcas as mar on veh.marcaId=mar.marcaId join modelos as mode on veh.modeloId=mode.modeloId");
      $statement->execute();
      $results=$statement->fetchAll(PDO::FETCH_ASSOC);
      $json=json_encode($results);      
	  $conn->commit();   
	  echo $json;
      exit();
 
 
 
 
 //Cambiar estado de vehiculo a vendido
	}else if($_REQUEST["servicio"] == "CambiarEstadoVehiculoAVendido" ){
      $idVehiculoModificar= $_REQUEST["idVehiculoModificar"];
	  
      $conn->beginTransaction();      
	  $sql = "UPDATE vehiculos SET estado='2' WHERE id= $idVehiculoModificar";    
      $conn->exec($sql);
	  $conn->commit();   
	  echo "Se ha modificado el usuario satisfactoriamente";
      exit();
 
 
  //Cambiar estado de vehiculo a eliminado
	}else if($_REQUEST["servicio"] == "CambiarEstadoVehiculoAVendido" ){
      $idVehiculoEliminar= $_REQUEST["idVehiculoEliminar"];
	  
      $conn->beginTransaction();      
	  $sql = "UPDATE vehiculos SET estado='3' WHERE id= $idVehiculoEliminar";    
      $conn->exec($sql);
	  $conn->commit();   
	  echo "Se ha modificado el usuario satisfactoriamente";
      exit();
 
 
 
 //Consultar tipos de vehiculo existentes
    }else if($_REQUEST["servicio"] == "ConsultarTiposVehiculoExistentes" ){     
	  $conn->beginTransaction();  
      $statement=$conn->prepare("select * from tiposvehiculo");
      $statement->execute();
      $results=$statement->fetchAll(PDO::FETCH_ASSOC);
      $json=json_encode($results);      
	  $conn->commit();   
	  echo $json;
      exit();
 
 
 
 //Consultar tipos de vehiculo existentes
    }else if($_REQUEST["servicio"] == "ConsultarMarcasExistentes" ){  
	  $conn->beginTransaction();  
      $statement=$conn->prepare("select * from marcas");
      $statement->execute();
      $results=$statement->fetchAll(PDO::FETCH_ASSOC);
      $json=json_encode($results);      
	  $conn->commit();   
	  echo $json;
      exit();
 
 //Consultar los modelos asociados a una marca
    }else if($_REQUEST["servicio"] == "ConsultarModelosAsociadoMarca"){    

	$marcaId= $_REQUEST["marcaId"];	
	
	  $conn->beginTransaction();  
      $statement=$conn->prepare("select * from modelos where marcaId = $marcaId");
      $statement->execute();
      $results=$statement->fetchAll(PDO::FETCH_ASSOC);
      $json=json_encode($results);      
	  $conn->commit();   
	  echo $json;
      exit();
 
 
 
 
 
	}else if ($_REQUEST["servicio"] == "Login") {

            $cred = array("", "");
            $cred[0] = $_REQUEST["user"];
            $cred[1] = $_REQUEST["pass"];

            $conn->beginTransaction();

            $statement = $conn->prepare("SELECT * FROM users where user='" . $cred[0] . "'");
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_COLUMN, 2);
            if ($results[0] == $cred[1]) {
                echo true;
            } else {
                echo false;
            }
            exit();
        }else{
     echo "No se encontro el servicio";
     // Se sale de la pagina php y se devuelve la respuesta
     exit();
	}
 }

	
}catch(PDOException $e)
{
echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>