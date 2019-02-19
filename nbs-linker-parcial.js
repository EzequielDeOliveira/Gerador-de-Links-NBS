function insereNbsLinks(pElement) {
    if (pElement) {
        
        var str = pElement.innerHTML;
        
        var res = str.replace(/[0-9]{1}\.[0-9]{2}([0-9]{2})?(\.[0-9])?([0-9])?(\.[0-9]{2})?/gi, function (x) {
            var cod = x;
            
            //Caso em que x é parte de um código existente. É necessário derivar o código real
            if (typeof nbsMapping[cod] == 'undefined') {
                if (cod.length == 9) cod = cod + ".00";
                else if (cod.length == 6) cod = cod + ".00.00";
            }
            
            //Caso o código realmente não existe
            if (typeof nbsMapping[cod] == 'undefined') {
                return x;
            }
            
            var href = "<a target=\"_blank\" href=\"/" + nbsMapping[cod][1] + "\" title=\"" + nbsMapping[cod][0] + "\">" + x + "</a>";
            return href;
        });
        
        pElement.innerHTML = res;
    }
};

$(document).ready(
    insereNbsLinks(document.getElementById("notaExplicativa"))
);