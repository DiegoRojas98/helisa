/* Requiere jquery => 3 */
let component = '<div style="z-index: 10;display: none;opacity: 0.95;width: 300px;min-height: 50px;height:auto;padding: 20px;border-radius: 15px;overflow: hidden;background-color: #d4edda;position:fixed;top: 20px;left:79%" id="boxAlert"></div>';
$('body').prepend(`${component}`);

function boxAlert(text,type =  'null',seconds = 7){
    var time = seconds;
    if(isNaN(time) || time < 1){
        time = 7;
    }
    time = time * 1000;
    var color;
    switch (type) {
        case 'warning' : color = '#fff3cd';break;
        case 'info' : color = '#d1ecf1' ;break;
        case 'success': color = '#d4edda';break;
        case 'danger': color = '#f8d7da';break;
        default: color = '#cce5ff';break;//primary
    }

    $('#boxAlert').text(text);
    $('#boxAlert').css('display','block');
    $('#boxAlert').css('background-color',`${color}`);

    setTimeout(function(){
        $('#boxAlert').css('display','none');
    }, time);
}
