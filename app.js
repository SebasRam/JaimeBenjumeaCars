// create the module and name it app
var app = angular.module('app', ['angularModalService']);

app.factory('DataFactory',[function () {

   var dataFactory = {};

dataFactory.getAnios = function () {
        anios = [
          { "id": 1,  "anio": 1994 },
          { "id": 2,  "anio": 1995 },
		  { "id": 3,  "anio": 1996 },
		  { "id": 4,  "anio": 1997 },
		  { "id": 5,  "anio": 1998 },
		  { "id": 6,  "anio": 1999 },
		  { "id": 7,  "anio": 2000 },
		  { "id": 8,  "anio": 2001 },
		  { "id": 9,  "anio": 2002 },
		  { "id": 10, "anio": 2003 },
		  { "id": 11, "anio": 2004 },
		  { "id": 12, "anio": 2005 },
		  { "id": 13, "anio": 2006 },
		  { "id": 14, "anio": 2007 },
		  { "id": 15, "anio": 2008 },
		  { "id": 16, "anio": 2009 },
		  { "id": 17, "anio": 2010 },
		  { "id": 18, "anio": 2011 },
		  { "id": 19, "anio": 2012 },
		  { "id": 20, "anio": 2013 },
		  { "id": 21, "anio": 2014 },
		  { "id": 22, "anio": 2015 },
		  { "id": 23, "anio": 2016 },
		  { "id": 24, "anio": 2017 },
		  { "id": 25, "anio": 2018 }
		];

        return anios;
    }

  return dataFactory;
}]);



//------------------------------------------ Controller del index------------------------------------------------------
app.controller('MainController', function ($scope, $http, ModalService) {

    $scope.mensaje = "Controlador del index";


    /**
Llama al modal panel de Detalle del vehiculo
*/
    $scope.MostrarModalDetalleVehiculo = function () {
        ModalService.showModal({
            templateUrl: 'modalDetalleVehiculo.html',
            controller: "ModalControllerDetalleVehiculo",
            inputs: {

            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.resultado = "hola";
            });
        });
    };






    //Funcion para insertar un nuevo registro en la base de datos de pruebas
    $scope.AdicionarNuevoRegistro = function () {
        $.ajax({
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'AdicionarNuevoRegistro', firstname: 'Otro usuario', lastname: 'Apellido', email: 'otrousuario@correo.com' },
            success: function (resultado) {
                // imprime "resultado Funcion"
                alert(resultado);
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        });


    }

    //Funcion para Modificar un registro existente en la base de datos de pruebas
    $scope.ModificarRegistroExistente = function () {
        $.ajax({
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'ModificarRegistroExistente', idUsuarioModificar: '5', nuevoNombre: 'nombre editado', nuevoApellido: 'apellido editado', nuevoCorreo: 'nuevo correo' },
            success: function (resultado) {
                // imprime "resultado Funcion"
                alert(resultado);
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        });

    }

});







//------------------------------------------ Controller de la pagina de administracion------------------------------------------------------ 
app.controller('ManageController', function ($scope, $http, ModalService, DataFactory) {

    $scope.mensaje = "Estas en el controller del crud de administrador";
    $scope.vehiculosExistentes = [];

    //Funcion para consultar los vehiculos que se encuentren creados en la base de datos
    $scope.Init = function () {
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'ConsultarVehiculosExistentes' },
            success: function (resultado) {
                // imprime "resultado Funcion"
                $scope.vehiculosExistentes = resultado;
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        })
		
		//Cargar tipos de vehiculos existentes
		  $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'ConsultarTiposVehiculoExistentes' },
            success: function (resultado) {
                // imprime "resultado Funcion"
                $scope.tiposVehiculoExistentes = resultado;
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        })
		
		//Cargar marcas de vehiculos existentes
		  $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'ConsultarMarcasExistentes' },
            success: function (resultado) {
                // imprime "resultado Funcion"
                $scope.marcasExistentes = resultado;
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        })
		
		
		  //Datafactory para los años
        $scope.anios = DataFactory.getAnios();
		
		
		
		
    };
	$scope.Init();
	
	

    //Funcion para Cambiar el estado de un vehiculo a vendido
    $scope.CambiarEstadoVehiculoAVendido = function () {
        $.ajax({
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'CambiarEstadoVehiculoAVendido', idVehiculoModificar: '4' },
            success: function (resultado) {
                // imprime "resultado Funcion"
                alert(resultado);
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        });

    }

    //Funcion para Cambiar el estado de un vehiculo a eliminado
    $scope.CambiarEstadoVehiculoAEliminado = function () {
        $.ajax({
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'CambiarEstadoVehiculoAEliminado', idVehiculoEliminar: '4' },
            success: function (resultado) {
                // imprime "resultado Funcion"
                alert(resultado);
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        });

    }


    /**
    Llama al modal panel de confirmación
*/
    $scope.MostrarModalConfirmar = function () {
        ModalService.showModal({
            templateUrl: 'modalConfirmar.html',
            controller: "ModalControllerConfirmar",
            inputs: {

            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.resultado = "hola";
            });
        });
    };




    /**
Llama al modal panel de Adicionar/Modificar vehiculo
*/
    $scope.MostrarModalAdicionarVehiculo = function () {
        ModalService.showModal({
            templateUrl: 'modalAdicionarVehiculo.html',
            controller: "ModalControllerAdicionarVehiculo",
            inputs: {

            },
			scope: $scope
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                 modal.scope.$destroy();
                 modal.element.remove();
            });
        });
    };



	
	
	
	
	
	
	
	
	
	
	
	
	  //Funcion para Consultar los modelos asociados a una marca
    $scope.ConsultarModelosAsociadoMarca = function (marcaId) {
        
		if(marcaId!=null){
			$.ajax({
			dataType: 'json',
            type: 'POST',
            url: 'servicios.php',
            data: { servicio: 'ConsultarModelosAsociadoMarca', marcaId: marcaId },
            success: function (resultado) {                
                $scope.modelosAsociados = resultado;
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        });
		}else{
			$scope.modelosAsociados = null;
			
		}
    }

	
	
	
	
	
	
	
	
	
	
	
	

});













//----------------------------------- Controller de la pagina de login  ---------------------------------------------
app.controller('LoginController', function($window,$scope, $http) {

    $scope.credentials = {
			'user' : '',
			'password' : ''
		}
				
			
			//Funcion para consultar los vehiculos que se encuentren creados en la base de datos
		$scope.refresh= function(){   

			credentials = {
				user : $scope.credentials.user,
				password : $scope.credentials.password
			}
			console.log(credentials);
			$.ajax({
				//dataType: 'json',	
				type: 'POST',
				url: 'servicios.php',
				data: {servicio: 'Login', user:$scope.credentials.user, pass:$scope.credentials.password},
				success:function(resultado){
				   // imprime	 "resultado Funcion"
				   //$scope.usuariosExistentes= resultado;
				   if(resultado==1){
					   $window.location.href = 'http://localhost/jaimealbertobenjumea/manage.html';
				   }else{
					   $scope.mensaje="contraseña invalida";
				   }
					},
				error: function (jqXHR, exception) {
					  alert("Error capturado: "+exception); 					  
				}	
			})
		};


});








//----------------------------------- Controller del modal de confirmacion  ---------------------------------------------
app.controller('ModalControllerConfirmar', ['$scope', 'close', function ($scope, close) {

    $scope.mensaje = "Esta seguro?";
    /**
        Cierra la ventana del modal panel de confirmación
    */
    $scope.close = function () {
        close(null, 500); // close, but give 500ms for bootstrap to animate
    };


    //Título de la ventana emergente
    $scope.title = "Mensaje de confirmacion";


}]);






//----------------------------------- Controller del modal de adicionar vehiculo  ---------------------------------------------
app.controller('ModalControllerAdicionarVehiculo', ['$scope', 'close', function ($scope, close) {

    /**
        Cierra la ventana del modal panel de confirmación
    */
    $scope.close = function () {
        close(null, 500); // close, but give 500ms for bootstrap to animate
    };


	
	
	//Funcion para enviar un archivo JSON al archivo php
    $scope.GuardarVehiculo = function () {		
		
		$scope.prueba= $scope.vehiculo;
		
        $.ajax({
            type: 'POST',			
            url: 'servicios.php',
            data: { servicio: 'AdicionarNuevoVehiculo', vehiculo: JSON.stringify($scope.vehiculo)},
            success: function (resultado) {
                // imprime "resultado Funcion"
                alert(resultado);
            },
            error: function (jqXHR, exception) {
                alert("Error capturado: " + exception);
            }
        });

    }
	
	
	
    //Título de la ventana emergente
    $scope.title = "Adicionar/Modificar vehiculo";


}]);






//----------------------------------- Controller del modal detalle del vehiculo  ---------------------------------------------
app.controller('ModalControllerDetalleVehiculo', ['$scope', 'close', function ($scope, close) {

    /**
        Cierra la ventana del modal panel de confirmación
    */
    $scope.close = function () {
        close(null, 500); // close, but give 500ms for bootstrap to animate
    };


    //Título de la ventana emergente
    $scope.title = "Detalle vehiculo";


}]);



