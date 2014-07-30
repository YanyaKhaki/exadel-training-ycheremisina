(function(root) {

    function QuizzApp() {
        this.currentQuestIndex = 0;
        this.currentTestIndex = 0;
        this.currentTest = 0;
        this.alreadyAnswered = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.alreadyDone = [];
    }

    QuizzApp.prototype.openTest = function (evt) {
        this.myRouter.cleanURL();
        if (this.alreadyDone.length === quizData.length) {
            alert('Вы прошли все тесты')
        }
        if (parseInt(evt.target.getAttribute("data-test-id"), 10) > -1) {
            var elem1 = document.getElementsByClassName('listQ')[0];
            var elem2 = document.getElementsByClassName('question')[0];
            elem1.style.display = 'none';
            elem2.style.display = 'block';
            this.currentTestIndex = parseInt(evt.target.getAttribute("data-test-id"), 10);
            this.addInfo('testName', quizData[parseInt(evt.target.getAttribute("data-test-id"), 10)].title);
            this.currentTest = quizData[parseInt(evt.target.getAttribute("data-test-id"), 10)].questions;
            this.addInfo('numb', this.currentTest.length);
            this.openNextQuest(this.currentTest[0])
        }
    };

    QuizzApp.prototype.openNextQuest = function (elem) {
        //название теста
        this.addInfo('text', elem.question);
        //номер текущего вопроса
        numb = this.currentQuestIndex;
        numb++;
        this.addInfo('currentNumb', numb);
        //картинка
        if (elem.questionImg != null) {
            document.getElementsByClassName('picture')[0].innerHTML = "<img src='" + elem.questionImg + "' />"
        } else {
            document.getElementsByClassName('picture')[0].innerHTML = null
        }
        //ответы
        for (var i = 0; i < elem.answers.length; i++) {
            var node = document.createElement('li');
            var textnode = document.createTextNode(elem.answers[i]);
            node.setAttribute('class', 'answers');
            node.setAttribute('check-answer-id', i + 1);
            node.appendChild(textnode);
            document.getElementById('questList').appendChild(node)
        }
        this.myRouter.getStats(this.currentTestIndex, this.currentQuestIndex);
        this.myRouter.createURL();
        this.Persist.getStatistics(this.currentTestIndex, this.currentQuestIndex, this.alreadyAnswered, this.correct, this.incorrect, this.alreadyDone);
    };

    QuizzApp.prototype.check = function (myAnswer) {
        var currentCorrectAnsw = this.currentTest[this.currentQuestIndex].right;
        if (myAnswer.target.getAttribute("check-answer-id") == currentCorrectAnsw) {
            this.correct++;
            this.addInfo('correctAn', this.correct);
            myAnswer.target.style.backgroundColor = 'green';
            alert('Верно!:)')
        }
        else {
            this.incorrect++;
            this.addInfo('incorrectAn', this.incorrect);
            myAnswer.target.style.backgroundColor = 'red';
            alert("Неверно. Правильный ответ: '"+this.currentTest[this.currentQuestIndex].answers[currentCorrectAnsw-1]+"'")
        }
    };

    QuizzApp.prototype.deleteQuestList = function () {
        var element = document.getElementById("questList");
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    };

    QuizzApp.prototype.addInfo = function (className, info) {
        document.getElementsByClassName(className)[0].innerHTML = info
    };

    QuizzApp.prototype.openRemainingData = function () {
        var flag = false;
        if (this.alreadyAnswered == this.currentTest.length) {
            this.showTheResults()
        } else {
            if (this.alreadyAnswered == this.currentTest.length - 1) {
                document.getElementById('button').style.visibility = 'hidden';
            }
            if (this.currentTest.length == this.currentQuestIndex) {
                for (var newSuperIndex = 0; newSuperIndex < this.currentTest.length; newSuperIndex++) {
                    if (!this.currentTest[newSuperIndex].answered) {
                        this.deleteQuestList();
                        this.currentQuestIndex = newSuperIndex;
                        this.openNextQuest(this.currentTest[this.currentQuestIndex]);
                        flag = true;
                        break
                    }
                }
            } else {
                this.currentQuestIndex++;
                for (var superIndex = this.currentQuestIndex; superIndex < this.currentTest.length; superIndex++) {
                    if (!this.currentTest[superIndex].answered) {
                        flag = true;
                        this.currentQuestIndex = superIndex;
                        break
                    }
                }
            }
            if (flag == false) {
                this.openRemainingData()
            } else {
                this.deleteQuestList();
                this.openNextQuest(this.currentTest[this.currentQuestIndex])
            }
        }
    };

    QuizzApp.prototype.showTheResults = function () {
        this.alreadyDone.push(this.currentTestIndex + 1);
        this.Persist.getStatistics(this.currentTestIndex, this.currentQuestIndex, this.alreadyAnswered, this.correct, this.incorrect, this.alreadyDone);
        var cor = document.getElementsByClassName('correctAn')[0].innerHTML;
        if (cor == this.currentTest.length || cor == this.currentTest.length - 1) {
            alert('Йо-хо-хо, вы успешно прошли тест!\n' + cor + ' из ' + this.currentTest.length + '.\nИдем на главную.');
        } else {
        alert('Вы не прошли ._.\nРезультат: ' + cor + ' из ' + this.currentTest.length + '.\nИдем на главную.');
        }
        var elem1 = document.getElementsByClassName('question')[0];
        var elem2 = document.getElementsByClassName('listQ')[0];
        elem1.style.display = 'none';
        elem2.style.display = 'block';
        document.getElementsByClassName('tests')[this.alreadyDone[this.alreadyDone.length-1]-1].style.listStyleImage = 'url(pics/tick.png)';
        document.getElementsByClassName('tests')[this.alreadyDone[this.alreadyDone.length-1]-1].setAttribute('data-test-id', '-1');
        this.currentQuestIndex = 0;
        this.currentTestIndex = 0;
        this.currentTest = 0;
        this.alreadyAnswered = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.myRouter.cleanURL();
        this.Persist.cleanStatistics();
        this.addInfo('correctAn', this.correct);
        this.addInfo('incorrectAn', this.incorrect);
        this.addInfo('currentNumb', this.currentQuestIndex);
        this.addInfo('numb','0');
    };

    QuizzApp.prototype.init = function(){
        this.Persist = new PersistanceModule();
        this.myRouter = new Router(this);
        console.log(this.myRouter);
        var self = this,
            tests = document.getElementsByClassName('tests'),
            nextQuest = document.getElementById('button'),
            someAnswers = document.getElementById('questList'),
            goBack = document.getElementById('back');

        root.addEventListener("hashchange", self.myRouter.onURLChange(), false);

        for (var a = 0; a < tests.length; a++) {
            tests[a].addEventListener("click", function (evt) { self.openTest(evt); }, false)
        }
        nextQuest.addEventListener("click", function() { self.openRemainingData(); }, false);
        someAnswers.addEventListener("click", function (evt) {
            if (evt.target.className == 'answers') {
                self.check(evt);
                self.currentTest[self.currentQuestIndex].answered = true;
                self.alreadyAnswered++;
                self.openRemainingData()
            }
        }, false);
        //this.myRouter.reloadPage();
        //this.myRouter.onURLChange();
        goBack.addEventListener("click", function() {
            self.myRouter.cleanURL();
            self.Persist.cleanStatistics()
        }, false);

    };

    root.QuizzApp = QuizzApp;

}(window));