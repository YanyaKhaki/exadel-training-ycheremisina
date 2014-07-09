/*function fun(eto){
    document.body.innerHTML = eto.innerHTML;
    eto.innerHTML = '';
}
function toggle(id) {
    document.getElementById("conten").innerHTML = document.getElementById(id).innerHTML;
}
function change(){
    getElementsByTagName('body')[0].innerHTML = ответ_аjax;
}*/


(function(root){

    var app = {};
    var numb = 0;

    app.openTest = function(){
        var elem1 = document.getElementById('listQ');
        var elem2 = document.getElementById('question');
        elem1.style.display = 'none';
        elem2.style.display = 'block';
        numb++;
        app.addInfo('numb',numb);
    };

    app.addInfo = function(id,per){
        document.getElementById(id).innerHTML = per;
    };

    app.rightAnsv = function(e){
        var smth = document.getElementById('an');
    };

    root.code = app;

}(window));

document.getElementById('test1').addEventListener( "click", code.openTest, false );
document.getElementById('test2').addEventListener( "click", code.openTest, false );
document.getElementById('test3').addEventListener( "click", code.openTest, false );
document.getElementById('test4').addEventListener( "click", code.openTest, false );
