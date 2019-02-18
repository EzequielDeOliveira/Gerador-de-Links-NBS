
$( document ).ready(function() {
    console.log( "ready!" );
    var str = document.getElementById("demo").innerHTML; 
    var res = str.replace(/[0-9]{1}\.[0-9]{2}([0-9]{2})?(\.[0-9])?([0-9])?(\.[0-9]{2})?/gi, function (x) {
        x = "<a href=\"#\">" + x + "</a>";
        return x;
    });
    document.getElementById("demo").innerHTML = res;
});
