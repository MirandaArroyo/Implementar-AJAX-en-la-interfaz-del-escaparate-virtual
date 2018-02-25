//cuando la pagina haya cargado, ejecuta la funcion
$(document).ready(function(){
    //ocultamos todas las imagenes de la lista
    $('#carrusel li').hide();
    //mostramos solo la primera imagen
    $('#carrusel li:first').show();
    //guardamos la longitud que tiene la lista ordenada de imagenes
    var imagenes=$('#carrusel li').length;
    //creamos la primera posicion desde la cual partir
    var posicion=1;
    //hacemos que al hacer click sobre la flecha izquierda muestre la imagen anterior
    $('#izquierda a').click(function anterior(){
        if( posicion <= 1){
            posicion = imagenes;
        } else {
            posicion--;
        }
        $('#carrusel li').hide();
        $('#carrusel li:nth-child('+posicion+')').fadeIn();
    });
    //hacemos que al hacer click sobre la flecha derecha se muestre la siguiente imagen y para ello llamamos a la funcion 'siguiente'
    $('#derecha a').click(siguiente);
    
    //hacemos que las imagenes pasen automaticamente
    setInterval(function(){
		siguiente();
	}, 3000); 
    
    //creamos la funcion siguiente que haga que las imagenes pase, la creamos a parte ya que es necesario llamarla desde dos lugares
    function siguiente(){
        if( posicion >= imagenes){
            posicion = 1;
        } else {
            posicion++;
        }
        
        $('#carrusel li').hide();
        
        $('#carrusel li:nth-child('+posicion+')').fadeIn();
    }
    
    
});