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
        app.openNextQuest(currentTest[0])
    };

    app.openNextQuest = function(elem){
        //название теста
        app.addInfo('text', elem.question);
        //номер текущего вопроса
        if ( numb > currentTest.length ){
            numb = indexOfCurrQuest;
        }
        numb++;
        app.addInfo('currentNumb',numb);
        //картинка
        if ( elem.questionImg != null ) {
            document.getElementsByClassName('picture')[0].innerHTML = "<img src='"+elem.questionImg+"' />"
        } else {
            document.getElementsByClassName('picture')[0].innerHTML = null
        }
        //ответы
        for ( var i = 0; i < elem.answers.length; i++ ) {
            var node = document.createElement('li');
            var textnode = document.createTextNode(elem.answers[i]);
            node.setAttribute('class', 'answers');
            node.setAttribute('check-answer-id', i+1);
            node.appendChild(textnode);
            document.getElementById('questList').appendChild(node)
         }
    };

    app.check = function(myAnswer){
        var currentCorrectAnsw = currentTest[indexOfCurrQuest].right;
        if ( myAnswer.target.getAttribute("check-answer-id") == currentCorrectAnsw ) {
            correct++;
            app.addInfo('correctAn',correct)
        }
        else {
            incorrect++;
            app.addInfo('incorrectAn',incorrect)
        }
    };

    app.deleteQuestList = function() {
        var element = document.getElementById("questList");
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    };

    app.addInfo = function(className,info){
        document.getElementsByClassName(className)[0].innerHTML = info
    };

    root.code = app;

}(window));

var indexOfCurrQuest = 0;
var currentTest = null;
var mySuperMas = [];
var alreadyAnswered = 0;

function turningOverMySuperMas() {
    for (var newIter = 1; newIter < mySuperMas.length+1; newIter++) {
        indexOfCurrQuest = mySuperMas[mySuperMas.length - newIter];
        console.log(indexOfCurrQuest);
        console.log(currentTest[indexOfCurrQuest]);
        code.deleteQuestList();
        code.openNextQuest(currentTest[indexOfCurrQuest])
    }
    mySuperMas = [];
    console.log(mySuperMas);
    //furtherActions();
}

function furtherActions(){
    if(document.getElementsByClassName('numb')[0].innerHTML == indexOfCurrQuest) { //|| mySuperMas.length == 0
        if (alreadyAnswered === currentTest.length) {
            if (cor == currentTest.length || cor == currentTest.length - 1) {
                alert('Йо-хо-хо, вы успешно прошли тест!\n' + cor + ' из ' + currentTest.length + '.\nИдем на главную.');
                document.location.href = "index.html"
            } else {
                alert('Вы не прошли ._.\nРезультат: ' + cor + ' из ' + currentTest.length + '.\nИдем на главную.');
                document.location.href = "index.html"
            }
        } else {
            if (confirm('Вы пропустили ' + mySuperMas.length + ' вопрос/a/ов. Продолжить выполнение теста?')) {
                debugger;
                for ( var superIndex = 0; superIndex < currentTest.length; superIndex++ ) {
                    if (!currentTest[superIndex].answered) {
                        code.deleteQuestList();
                        code.openNextQuest(currentTest[superIndex]);
                        indexOfCurrQuest = superIndex
                    }
                }
                //turningOverMySuperMas()

            } else {
                document.location.href = "index.html"
            }
        }
        return true;
    } else {
        return false;
    }
}

var tests = document.getElementsByClassName('tests');
for (var a = 0; a < tests.length; a++) {
    tests[a].addEventListener( "click", code.openTest, false )
};

var nextQuest = document.getElementById('button');
nextQuest.addEventListener( "click", function(){
    indexOfCurrQuest++;
    mySuperMas.push(indexOfCurrQuest);
    console.log(mySuperMas);
    if (!furtherActions()) {
        code.deleteQuestList();
        code.openNextQuest(currentTest[indexOfCurrQuest])
    } else {
        furtherActions()
    }
}, false );

var someAnswers = document.getElementById('questList');
someAnswers.addEventListener( "click", function(evt){
    if (evt.target.className == 'answers') {
        if (currentTest[indexOfCurrQuest].answered == true) {
            alreadyAnswered++
        }
        code.check(evt);
        indexOfCurrQuest++;
        if (!furtherActions()) {
            currentTest[indexOfCurrQuest].answered = true;
            console.log(alreadyAnswered);
            code.deleteQuestList();
            code.openNextQuest(currentTest[indexOfCurrQuest])
        } else {
            furtherActions()
        }
    }
}, false );

/*delete indexOfCurrQuest;
delete currentTest;
delete mySuperMas*/

// constants to define the title of the alert and button text.
/*var ALERT_TITLE = "Oops!";
var ALERT_BUTTON_TEXT = "Ok";

// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    // shortcut reference to the document object
    d = document;

    // if the modalContainer object already exists in the DOM, bail out.
    if(d.getElementById("modalContainer")) return;

    // create the modalContainer div as a child of the BODY element
    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    // make sure its as tall as it needs to be to overlay all the content on the page
    mObj.style.height = document.documentElement.scrollHeight + "px";

    // create the DIV that will be the alert
    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    // MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    // center the alert box
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";

    // create an H1 element as the title bar
    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    // create a paragraph element to contain the txt argument
    msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = txt;

    // create an anchor element to use as the confirmation button.
    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    // set up the onclick event to remove the alert when the anchor is clicked
    btn.onclick = function() { document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));return false; }
}*/