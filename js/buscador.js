 $("#search").keydown(function(){
    $.getJSON("http://localhost:3000/productos", function(data){
        var search = $("#search").val();
        var regEx = new RegExp(search, 'i');
        var output;
        $.each(data, function(key, val){
               if((val.nombre.search(regEx) !=-1)){
                   output+="<tr>"
                   output+="<td id='"+key+"'>"+val.nombre+"</td>"
                   //output+="<td id='"+key+"'>"+val.precio+"</td>"
                   output+="</tr>"
                   if(document.getElementById("search").value===""){
                        $("table").hide();
                    }else{
                        $("table").show();
                    }
               }
            });
        $("tbody").html(output);
    });
})
 
 