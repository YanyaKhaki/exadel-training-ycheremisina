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
        app.openNextQuest(quizData[parseInt(evt.target.getAttribute("data-test-id"),10)].questions);
    };


    app.openNextQuest = function(elem){
        app.addInfo('text', elem[0].question);
        numb++;
        app.addInfo('numb',numb);
        if ( elem[0].questionImg != null ) {
            document.getElementsByClassName('picture')[0].innerHTML = "<img src='"+elem[0].questionImg+"' />";
        }
        var newInfo = document.getElementsByClassName('answers');
        for ( var i = 0; i < newInfo.length; i++ ){
            console.log(newInfo[i]);
            document.getElementsByClassName(newInfo[i].className)[i].innerHTML = elem[0].answers[i];
            if ( elem[0].answers[i] == null ) {
                newInfo[i].parentNode.removeChild(newInfo[i]);
            }
        }
    };

    app.check = function(myAnswer){
        var currentAnsw = quizData[parseInt(myAnswer.target.getAttribute("check-answer-id"),10)].questions[0].right;
        if ( myAnswer.target.getAttribute("check-answer-id") == currentAnsw - 1 ) {
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

var tests = document.getElementsByClassName('tests');
for (var i = 0; i < tests.length; i++) {
    tests[i].addEventListener( "click", code.openTest, false );
};

var nextQuest = document.getElementsByClassName('pass');
for (var i = 0; i < nextQuest.length; i++) {
    nextQuest[i].addEventListener( "click", code.openNextQuest, false );
};

var someAnswers = document.getElementsByClassName("answers");
for (var i = 0; i < someAnswers.length; i++) {
    someAnswers[i].addEventListener( "click", code.check, false );
};