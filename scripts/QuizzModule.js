(function(root) {

    function QuizzModule() {
        this.currentQuestIndex = 0;
        this.currentTestIndex = -1;
        this.currentTest = 0;
        this.alreadyAnswered = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.alreadyDone = [];
        this.$testList = $('.testList');
        this.$tests = $('.tests');
        this.$someAnswers = $('.answersList');
        this.$nextQuest = $('.skip');
        this.$goBack = $('.back');
        this.statistics = new Stats(this);
        this.Persist = new PersistanceModule();
    }

    QuizzModule.prototype.createQuest = function () {
        this.$testList.on("click", { param: this }, function (event) {
            event.data.param.currentTestIndex = parseInt(event.target.getAttribute("data-test-id"), 10);
            event.data.param.openTest(event);
            //self.myRouter.getStats();
            //self.myRouter.createURL()
        })
    };

    QuizzModule.prototype.mainPage = function () {
        this.$goBack.on("click", { param: this }, function (evt) {
            event.data.param.Persist.cleanStatistics();
            event.data.param.hideElements('question','listQ');
            event.data.param.currentQuestIndex = 0;
            event.data.param.currentTestIndex = -1;
            event.data.param.currentTest = 0;
            event.data.param.alreadyAnswered = 0;
            event.data.param.correct = 0;
            event.data.param.incorrect = 0;
            self.Persist.getStatistics(self.questModule.currentTestIndex, self.questModule.currentQuestIndex, self.questModule.alreadyAnswered, self.questModule.correct, self.questModule.incorrect, self.questModule.alreadyDone);
            event.data.param.getToQuizzApp(event.data.param.Persist.currTestIndex, event.data.param.Persist.currQuestIndex, event.data.param.Persist.alrAnswered, event.data.param.Persist.corr, event.data.param.Persist.incorr, event.data.param.Persist.alrDone);
            event.data.param.statistics.addInfoToStats(event.data.param.currentQuestIndex, '0');
            //self.myRouter.getStats(self.questModule.currentTestIndex, self.questModule.currentQuestIndex);
            //self.myRouter.createURL()
            window.location.hash = '';
            evt.preventDefault();
        })
    };

    QuizzModule.prototype.answerQuest = function () {
        this.$someAnswers.on("click", { param: this }, function (evt) {
            evt.data.param.check(evt);
            evt.data.param.currentTest[evt.data.param.currentQuestIndex].answered = true;
            evt.data.param.alreadyAnswered++;
            evt.data.param.openRemainingData();
            //self.myRouter.getStats(self.questModule.currentTestIndex, self.questModule.currentQuestIndex);
            //self.myRouter.createURL()
        })
    };

    QuizzModule.prototype.nextQuest = function () {
        this.$nextQuest.on("click", { param: this }, function (evt) {
            evt.data.param.openRemainingData()
        })
    };

    QuizzModule.prototype.openTest = function (evt) {
        console.log(this.$tests);
        //this.myRouter.cleanURL();
        //this.myRouter.getStats();
        //this.myRouter.createURL();
        if (this.alreadyDone.length === quizData.length) {
            alert('Вы прошли все тесты')
        }
        if (parseInt(evt.target.getAttribute("data-test-id"), 10) > -1) {
            this.hideElements('listQ', 'question');
            this.currentTestIndex = parseInt(evt.target.getAttribute("data-test-id"), 10);
            this.currentTest = quizData[this.currentTestIndex].questions;
            this.addInfo('testName', quizData[this.currentTestIndex].title);
            this.addInfo('numb', this.currentTest.length);
            this.openNextQuest(this.currentTest[0])
        }
    };

    QuizzModule.prototype.openNextQuest = function (elem) {
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
        this.addInfo('testName', quizData[this.currentTestIndex].title);
        this.statistics.addInfoToStats(this.currentQuestIndex + 1, this.currentTest.length);
        //this.myRouter.getStats(this.currentTestIndex, this.currentQuestIndex);
        //this.myRouter.createURL();
        this.Persist.getStatistics(this.currentTestIndex, this.currentQuestIndex, this.alreadyAnswered, this.correct, this.incorrect, this.alreadyDone);
    };

    QuizzModule.prototype.check = function (myAnswer) {
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
            alert("Неверно.\nПравильный ответ: '" + this.currentTest[this.currentQuestIndex].answers[currentCorrectAnsw - 1] + "'")
        }
    };

    QuizzModule.prototype.deleteQuestList = function () {
        var element = document.getElementById("questList");
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    };

    QuizzModule.prototype.addInfo = function (className, info) {
        //$('."' + className + '"')[0].innerHTML = info
       document.getElementsByClassName(className)[0].innerHTML = info
    };

    QuizzModule.prototype.hideElements = function (class1, class2) {
        //var elem1 = $('."' + class1 + '"')[0];
        //var elem2 = $('."' + class2 + '"')[0];
        var elem1 = document.getElementsByClassName(class1)[0];
        var elem2 = document.getElementsByClassName(class2)[0];
        elem1.style.display = 'none';
        elem2.style.display = 'block'
    };

    QuizzModule.prototype.openRemainingData = function () {
        var flag = false;
        if (this.alreadyAnswered == this.currentTest.length) {
            this.showTheResults()
        } else {
            if (this.alreadyAnswered == this.currentTest.length - 1) {
                document.getElementById('button').style.visibility = 'hidden';
            } else {
                document.getElementById('button').style.visibility = 'visible';
            }
            if (this.currentTest.length == this.currentQuestIndex) {
                for (var newSuperIndex = 0; newSuperIndex < this.currentTest.length; newSuperIndex++) {
                    if (!this.currentTest[newSuperIndex].answered) {
                        this.deleteQuestList();
                        this.currentQuestIndex = newSuperIndex;
                        this.openNextQuest(this.currentTest[this.currentQuestIndex]);
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

    QuizzModule.prototype.showTheResults = function () {
        this.alreadyDone.push(this.currentTestIndex + 1);
        var cor = document.getElementsByClassName('correctAn')[0].innerHTML;
        if (cor == this.currentTest.length || cor == this.currentTest.length - 1) {
            alert('Йо-хо-хо, вы успешно прошли тест!\n' + cor + ' из ' + this.currentTest.length + '.\nИдем на главную.')
        } else {
            alert('Вы не прошли ._.\nРезультат: ' + cor + ' из ' + this.currentTest.length + '.\nИдем на главную.')
        }
        this.hideElements('question', 'listQ');
        this.$tests[this.alreadyDone[this.alreadyDone.length - 1] - 1].style.listStyleImage = 'url(pics/tick.png)';
        this.$tests[this.alreadyDone[this.alreadyDone.length - 1] - 1].setAttribute('data-test-id', '-1');
        this.currentQuestIndex = 0;
        this.currentTestIndex = -1;
        this.currentTest = 0;
        this.alreadyAnswered = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.Persist.getStatistics(this.currentTestIndex, this.currentQuestIndex, this.alreadyAnswered, this.correct, this.incorrect, this.alreadyDone);
        this.getToQuizzApp(this.Persist.currTestIndex, this.Persist.currQuestIndex, this.Persist.alrAnswered, this.Persist.corr, this.Persist.incorr, this.Persist.alrDone);
        this.statistics.addInfoToStats(this.currentQuestIndex, '0');
        window.location.hash = '';
    };

    root.QuizzModule = QuizzModule;

}(window));