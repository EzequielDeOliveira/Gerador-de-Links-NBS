$.getJSON("dict.json", function(data) {
    
    $( document ).ready(function() {
        var str = document.getElementById("demo").innerHTML; 
        console.log( "ready!" );

        var res = str.replace(/[0-9]{1}\.[0-9]{2}([0-9]{2})?(\.[0-9])?([0-9])?(\.[0-9]{2})?/gi, function (x) {
            var cod = x;
            
            //Caso em que x é parte de um código existente. É necessário derivar o código real
            if (typeof data[cod] == 'undefined') {
                if (cod.length == 9) cod = cod + ".00";
                else if (cod.length == 6) cod = cod + ".00.00";                
            }
            
            //Caso o código realmente não existe
            if (typeof data[cod] == 'undefined') {
                return x;
            }
            
            var href = "<a href=\"/concepts/" + data[cod][1] + "\" title=\"" + data[cod][0] + "\">" + x + "</a>";
            return href;
        });

        document.getElementById("demo").innerHTML = res;
    });

});

