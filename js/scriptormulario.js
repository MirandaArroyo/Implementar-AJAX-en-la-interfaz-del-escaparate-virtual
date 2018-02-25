
function validaformulario(){
    var todoCorrecto=true;
    var nombre= document.getElementById("nombre").value;
    var apellidos= document.getElementById("apellidos").value;
    var correo= document.getElementById("correo").value;
    var contrasenia1= document.getElementById("contrasenia").value;
    var contrasenia2= document.getElementById("confirmacion").value;
    var haseada = sha256(contrasenia1);
    var pais= document.getElementById("pais").value;
    var tarjeta=   document.getElementById("tarjeta").value;
    var mensaje="";
    var passValida=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    var valido = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
    var visa=/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/g;
    var mastercard=/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/g;
    
    //validaciones de nombre
    var arrayNombre= nombre.split(" ");
    if(arrayNombre.length>2){
       todoCorrecto= false; 
       mensaje+="El nombre no puede contener mas de dos palabras <br>";
    }
    //validacion apellidos
    var arrayApellidos= apellidos.split(" ");
     if(arrayApellidos.length>2){
       todoCorrecto= false; 
        mensaje+="los apellidos no pueden contener mas de dos palabras<br>";
    }
    //validacion de correo electronico
    
     if (!valido.test(correo)){
        todoCorrecto= false;
        mensaje+="El correo electronico no coincide<br>";
    }
    //validacion de contraseña
     
    if(!passValida.test(contrasenia1) || contrasenia1!==contrasenia2){
           todoCorrecto= false;
            mensaje+="las contraseñas deben coincidir <br>";
    }
    //validar tarjeta
    tarjeta=parseInt(tarjeta);
    
   // muestraCampo();
    if(tarjeta && !visa.test(tarjeta) && !mastercard.test(tarjeta)){     
            todoCorrecto=false;
            mensaje+="El numero de tarjeta no es correcto";
    }
    
    if(todoCorrecto){
        alert("se han registrado los datos correctamente");
        guardarCookie("name", nombre, 2);
        guardarCookie("password", haseada, 2);
    }else{
        alert(mensaje);
    }
    
}
function buscaProductos() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
//con esta funcion mostraremos el campo de la tarjeta de credito si el usuario ha introdicido direccion
/*var contenedor= document.getElementById("Campotarjeta");
    var inputTarjeta=document.createElement('INPUT');
    inputTarjeta.setAttribute("id", "tarjeta");
inputTarjeta.setAttribute("type", "text");
    contenedor.appendChild(inputTarjeta);*/
    
/*function muestraCampo(){
    
        
    var direccion= document.getElementById("direccion").value;/*
    var contenedor= document.getElementById("Campotarjeta");
    var inputTarjeta=document.createElement('INPUT');
    inputTarjeta.type='TEXT';
    inputTarjeta.id='tarjeta';
    contenedor.appendChild(inputTarjeta);
    
    if(direccion!=""){
        
     document.getElementById("Campotarjeta").style.display='block';
    }else{
        //contenedor.removeChild(contenedor.childNodes[0]);
        document.getElementById("Campotarjeta").style.display='none';
    }
    

}*/

function campoPaises(){
    
            var cajaPaises= document.getElementById("pais"),option;
            var paisesUrl ="https://raw.githubusercontent.com/umpirsky/country-list/master/data/es/country.json";

        var getJSON = function(url) {
          return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
              var status = xhr.status;
              var readyState = xhr.readyState;   
              if (status == 200 && readyState==4) {
                resolve(xhr.response);
              } else {
                reject(status);
              }
            };
            xhr.send();
          });
        };

        getJSON(paisesUrl).then(function(data) {
         for(var i in data)   {
             option= document.createElement("option");
             option.setAttribute("value", i);
             option.innerHTML=i;
             cajaPaises.appendChild(option);
            
         }
          
        }, function(status) {
          alert('Error...');
        }); 
}

function guardarCookie(nombreCookie, valorCookie, diasExpirar) {
	var fecha = new Date();
	fecha.setTime(fecha.getTime() + (diasExpirar *24*60*60*1000));
	var expira = "expira="+ fecha.toUTCString();
	document.cookie = nombreCookie + "=" + valorCookie + ";" + expira + ";path=/";
}
function obtenerCookie(nombreCookie) {
	var nombre = nombreCookie + "=";
	var cookieDescodificada = decodeURIComponent(document.cookie);
	var arrayCookie = cookieDescodificada.split(';');
	for(var i = 0; i < arrayCookie.length; i++) {
    	var cookie = arrayCookie [i];
    	while (cookie.charAt(0) == ' ') {
        	cookie = cookie.substring(1);
    	}
    	if (cookie.indexOf(nombre) == 0) {
        	return cookie.substring(nombre.length, cookie.length);
    	}
	}
	return "";
}
function confirmaCookie(){
    var user=document.getElementById("nombre2").value;
    var passw=document.getElementById("pass").value;
    var passHaseada=sha256(passw);
    var nombreUsuario=obtenerCookie("name");
    var contrasenia=obtenerCookie("password");
    if (user == nombreUsuario && passHaseada==contrasenia) {
        guardarCookie("logueado", true, 2);
        alert("Bienvenido/a " + user); 
        return true;
        
    } else {
        alert("Los datos no son correctos");
    }
}

function cerrarSesion(){
    if(obtenerCookie('logueado')=='true'){
        guardarCookie('logueado', 'false',-1);
        location.reload();
    }else{
        location.href = '#';
    }
}


if(obtenerCookie("logueado")=="true"){
    var nombreUsuario=obtenerCookie("name");
     document.getElementById('inicioSesion').innerHTML=nombreUsuario;
}
/*
$("i.fa.fa-heart").click(function() {
  if(obtenerCookie("logueado")=="true"){
        var contador= $(this).html();
        contador=parseInt(contador);
        contador++;
        $(this).text(contador);
        $(this).css("color", "red");
      
    }
});

$("i.fa.fa-star").click(function() {
    if(obtenerCookie("logueado")=="true"){
        var contador= $(this).html();
        contador=parseInt(contador);
        contador++;
        $(this).text(contador);
        $(this).css("color", "yellow");
    }
});

//Creacion de caja de comentarios con DOM
var comentarios =document.getElementById("cajaComentarios");
if(obtenerCookie("logueado")=="true"){
    generaCajaComentarios();
            
}
generaComentarios();

function muestramelo()
{
	var vista=document.getElementById("cajaComentarios").style.display;
	if(vista=='none'){
		vista='block';
	}else{
		vista='none';
    }

	document.getElementById("cajaComentarios").style.display = vista;
}

function generaComentarios(){
    var comentarios = document.getElementById("cajaComentarios");
    var parrafo = document.createElement('p');
    var parrafo2 = document.createElement('p');
    var parrafo3 = document.createElement('p');
    var texto = document.createTextNode('Paco: muy bueno!');
    var texto2 = document.createTextNode('Pepe: riquisimo!');
    var texto3 = document.createTextNode('Lola: genial!');
    parrafo.appendChild(texto);
    parrafo2.appendChild(texto2);
    parrafo3.appendChild(texto3);
    comentarios.appendChild(parrafo);
    comentarios.appendChild(parrafo2);
    comentarios.appendChild(parrafo3);

}
function generaCajaComentarios(){
    var comentarios=document.getElementById("cajaComentarios");
        
        var formulario=document.createElement('FORM');
        formulario.name='formularioComentarios';
        formulario.id='formularioComentarios';
        formulario.method='POST';
        
        var miInput=document.createElement('INPUT');
        miInput.type='TEXT';
        miInput.id='comentario';
        miInput.name='comentario';
        
        //boton de envio:
        var enviar = document.createElement("button");
        var t = document.createTextNode("Enviar comentario");
        //añadimos estilos al boton
        enviar.setAttribute("type", "submit");
        enviar.setAttribute("id", "enviarComentario");
        enviar.style.backgroundColor="#ff80bf";
        enviar.style.color="white";
        
        enviar.appendChild(t); 
        comentarios.appendChild(formulario);
        formulario.appendChild(miInput);
        formulario.appendChild(enviar);
        
        document.getElementById("enviarComentario").addEventListener('click', function(e){ 
            muestraComentario();
            //sumamos 1 cada vez que el susuario genera un comentario
            var contador= $("i.fa.fa-comment").html();
            contador=parseInt(contador);
            contador++;
            $("i.fa.fa-comment").text(contador);
            $("i.fa.fa-comment").css("color", "grey");

            e.preventDefault();
        });
        
}
function muestraComentario(){
    var nombre= obtenerCookie("name");
    var com= document.getElementById("comentario").value;
    var comentarios = document.getElementById("cajaComentarios");
    var parrafo = document.createElement('p');
    var texto = document.createTextNode(nombre+": "+com);
    var usuario = document.createTextNode(nombre);
    parrafo.appendChild(texto);
    comentarios.insertBefore(parrafo, comentarios.childNodes[1]); 
    
}

*/