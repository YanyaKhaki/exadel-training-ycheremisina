(function(root){

    var app = {};
    var numb = 0;
    var correct = 0;
    var incorrect = 0;

    app.openTest = function(evt){
        var elem1 = document.getElementsByClassName('listQ')[0];
        var elem2 = document.getElementsByClassName('question')[0];
        elem1.style.display = 'none';
        elem2.style.display = 'block';
        numb++;
        app.addInfo('numb',numb);

        console.log(evt.target);
        console.log(quizData[parseInt(evt.target.getAttribute("data-test-id"),10)])

    };

    app.addInfo = function(className,smth){
        document.getElementsByClassName(className)[0].innerHTML = smth;
    };

    /*app.check = function(){
        //if ( $("#myCheck").hasClass("correct") ) {
        if ( ) {
            correct++;
            app.addInfo('correctAn', correct);
        }
        else {
            incorrect++;
            app.addInfo('incorrectAn',incorrect);
        }

    };*/

    app.correctAn = function(){
        correct++;
        app.addInfo('correctAn',correct);
    };

    app.incorrectAn = function(){
        incorrect++;
        app.addInfo('incorrectAn',incorrect);
    };

    root.code = app;

}(window));

var tests = document.getElementsByClassName('tests');
for (var i = 0; i < tests.length; i++) {
    tests[i].addEventListener("click", code.openTest, false );
};

var answer = document.getElementsByClassName('answer');
for (var i = 0; i < answer.length; i++) {
    answer[i].addEventListener( "click", code.openTest, false );
};

var corAns = document.getElementsByClassName('correct');
for (var i = 0; i < corAns.length; i++) {
    corAns[i].addEventListener( "click", code.correctAn, false );
};

var incAns = document.getElementsByClassName('incorrect');
for (var i = 0; i < incAns.length; i++) {
    incAns[i].addEventListener( "click", code.incorrectAn, false );
};