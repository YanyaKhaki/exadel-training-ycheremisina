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
        app.addInfo('testName',quizData[parseInt(evt.target.getAttribute("data-test-id"),10)].title);
        currentTest = quizData[parseInt(evt.target.getAttribute("data-test-id"),10)].questions;
        app.addInfo('numb',currentTest.length);
        app.openNextQuest(currentTest[0]);
    };

    app.openNextQuest = function(elem){
            app.addInfo('text', elem.question);
            numb++;
            app.addInfo('currentNumb',numb);
            if ( elem.questionImg != null ) {
                document.getElementsByClassName('picture')[0].innerHTML = "<img src='"+elem.questionImg+"' />";
            }
            var newInfo = document.getElementsByClassName('answers');
            for ( var i = 0; i < newInfo.length; i++ ){
                document.getElementsByClassName(newInfo[i].className)[i].innerHTML = elem.answers[i];
                if ( elem.answers[i] == null ) {
                    newInfo[i].parentNode.removeChild(newInfo[i]);
                }
            }
    };

    app.check = function(myAnswer){
        var currentCorrectAnsw = currentTest[indexOfCurrQuest].right;
        if ( myAnswer.target.getAttribute("check-answer-id") == currentCorrectAnsw ) {
            correct++;
            app.addInfo('correctAn',correct);
        }
        else {
            incorrect++;
            app.addInfo('incorrectAn',incorrect);
        }
    };

    app.addInfo = function(className,info){
        document.getElementsByClassName(className)[0].innerHTML = info;
    };

    root.code = app;

}(window));

var indexOfCurrQuest = 0;
var currentTest = null;
var mySuperMas = [];

function furtherActions(){
    if(document.getElementsByClassName('numb')[0].innerHTML == indexOfCurrQuest) {
        var cor = parseInt(document.getElementsByClassName('correctAn')[0].innerHTML,10);
        var incor = parseInt(document.getElementsByClassName('incorrectAn')[0].innerHTML);
        if (cor + incor === currentTest.length) {
            if (cor == incor || cor == incor - 1) {
                alert('Йо-хо-хо, вы успешно прошли тест!\n' + cor + ' из ' + currentTest.length + '.\nИдем на главную.');
                document.location.href = "index.html"
            } else{
                alert('Вы не прошли ._.\nРезультат: ' + cor + ' из ' + currentTest.length + '.\nИдем на главную.');
                document.location.href = "index.html"
            }
        } else {
            if (confirm('Вы пропустили ' + mySuperMas.length + ' вопрос/a/ов. Продолжить выполнение теста?')) {
                //alert("Погнали");
                console.log(currentTest[mySuperMas[mySuperMas.length-1]]);
                code.openNextQuest(currentTest[mySuperMas[mySuperMas.length-1]]);
                delete mySuperMas[mySuperMas.length-1];
                /*for (var newIter = 0; newIter < mySuperMas.length; newIter++){
                    code.openNextQuest(currentTest[newIter])
                }*/
            } else {
                //alert("Идем на главную");
                document.location.href = "index.html"
            }
        }
    }
}

var tests = document.getElementsByClassName('tests');
for (var a = 0; a < tests.length; a++) {
    tests[a].addEventListener( "click", code.openTest, false );
};

var nextQuest = document.getElementsByClassName('button');
for (var i = 0; i < nextQuest.length; i++) {
    nextQuest[i].addEventListener( "click", function(){
        indexOfCurrQuest++;
        mySuperMas.push(indexOfCurrQuest);
        console.log(mySuperMas);
        furtherActions();
        code.openNextQuest(currentTest[indexOfCurrQuest])
    }, false );
};

var someAnswers = document.getElementsByClassName("answers");
for (var iter = 0; iter < someAnswers.length; iter++) {
    someAnswers[iter].addEventListener( "click", function(evt){
        code.check(evt);
        indexOfCurrQuest++;
        furtherActions();
        code.openNextQuest(currentTest[indexOfCurrQuest])
    }, false );
};

/*delete indexOfCurrQuest;
delete currentTest;
delete mySuperMas*/