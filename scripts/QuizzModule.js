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
        this.myRouter = new Router(this);
        //this.myRouter.onURLChange();
    }

    QuizzModule.prototype.createQuest = function () {
        this.Persist.cleanStatistics();
        this.$testList.on("click", { param: this }, function (event) {
            event.data.param.currentTestIndex = parseInt(event.target.getAttribute("data-test-id"), 10);
            event.data.param.myRouter.getStats(event.data.param.currentTestIndex, event.data.param.currentQuestIndex);
            event.data.param.myRouter.createURL();
            event.data.param.openTest(event)
        })
    };

    QuizzModule.prototype.mainPage = function () {
        this.$goBack.on("click", { param: this }, function (event) {
            var self = event.data.param;
            self.Persist.cleanStatistics();
            self.hideElements('question','listQ');
            self.bringToNought();
            self.Persist.getStatistics(self.questModule.currentTestIndex, self.questModule.currentQuestIndex, self.questModule.alreadyAnswered, self.questModule.correct, self.questModule.incorrect, self.questModule.alreadyDone);
            self.getToQuizzApp(self.Persist.currTestIndex, self.Persist.currQuestIndex, self.Persist.alrAnswered, self.Persist.corr, self.Persist.incorr, self.Persist.alrDone);
            self.statistics.addInfoToStats(self.currentQuestIndex, '0');
            self.myRouter.getStats(self.currentTestIndex, self.currentQuestIndex);
            //self.myRouter.createURL();
            window.location.hash = '';
            event.preventDefault()
        })
    };

    QuizzModule.prototype.answerQuest = function () {
        this.$someAnswers.on("click", { param: this }, function (evt) {
            var self = evt.data.param;
            self.check(evt);
            self.currentTest[self.currentQuestIndex].answered = true;
            self.alreadyAnswered++;
            self.openRemainingData();
            self.myRouter.getStats(self.currentTestIndex, self.currentQuestIndex);
            self.myRouter.createURL()
        })
    };

    QuizzModule.prototype.nextQuest = function () {
        this.$nextQuest.on("click", { param: this }, function (evt) {
            evt.data.param.openRemainingData()
        })
    };

    QuizzModule.prototype.openTest = function (evt) {
        this.myRouter.cleanURL();
        this.myRouter.getStats(this.currentTestIndex, this.currentQuestIndex);
        this.myRouter.createURL();
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
            document.getElementById('questList').appendChild(node);
            //node.style.background = '#CAFF70';
        }
        this.addInfo('testName', quizData[this.currentTestIndex].title);
        this.statistics.addInfoToStats(this.currentQuestIndex + 1, this.currentTest.length);
        this.myRouter.getStats(this.currentTestIndex, this.currentQuestIndex);
        this.myRouter.createURL();
        this.Persist.getStatistics(this.currentTestIndex, this.currentQuestIndex, this.alreadyAnswered, this.correct, this.incorrect, this.alreadyDone)
    };

    QuizzModule.prototype.check = function (myAnswer) {
        var currentCorrectAnsw = this.currentTest[this.currentQuestIndex].right;
        if (myAnswer.target.getAttribute("check-answer-id") == currentCorrectAnsw) {
            this.correct++;
            this.addInfo('correctAn', this.correct);
            myAnswer.target.style.backgroundColor = 'green';
            /*$.fn.jAlert({
                'title': 'Верно!:)',
                'message': "Ура-ура!",
                'theme': 'success',
                'size': 'medium'
            });*/
            alert('Верно!:)')
        }
        else {
            this.incorrect++;
            this.addInfo('incorrectAn', this.incorrect);
            myAnswer.target.style.backgroundColor = 'red';
            /*$.fn.jAlert({
                'title': 'Неверно',
                'message': "Правильный ответ: '" + this.currentTest[this.currentQuestIndex].answers[currentCorrectAnsw - 1] + "'",
                'theme': 'error',
                'size': 'medium'
            });*/
            alert("Неверно.\nПравильный ответ: '" + this.currentTest[this.currentQuestIndex].answers[currentCorrectAnsw - 1] + "'")
        }
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
            alert('Йо-хо-хо, вы успешно прошли тест!\nПравильных: ' + cor + ' из ' + this.currentTest.length + '.\nИдем на главную.')
        } else {
            alert('Вы не прошли ._.\nРезультат: ' + cor + ' из ' + this.currentTest.length + '.\nИдем на главную.')
        }
        this.hideElements('question', 'listQ');
        this.$tests[this.alreadyDone[this.alreadyDone.length - 1] - 1].style.listStyleImage = 'url(pics/tick.png)';
        this.$tests[this.alreadyDone[this.alreadyDone.length - 1] - 1].setAttribute('data-test-id', '-1');
        this.bringToNought();
        this.Persist.getStatistics(this.currentTestIndex, this.currentQuestIndex, this.alreadyAnswered, this.correct, this.incorrect, this.alreadyDone);
        this.getToQuizzApp(this.Persist.currTestIndex, this.Persist.currQuestIndex, this.Persist.alrAnswered, this.Persist.corr, this.Persist.incorr, this.Persist.alrDone);
        this.statistics.addInfoToStats(this.currentQuestIndex, '0');
        this.myRouter.getStats(this.currentTestIndex, this.currentQuestIndex);
        this.myRouter.cleanURL();
    };

    QuizzModule.prototype.getToQuizzApp = function(currentTestIndex, currentQuestIndex, alreadyAnswered, correct, incorrect, alreadyDone) {
        this.currentTestIndex = currentTestIndex;
        this.currentQuestIndex = currentQuestIndex;
        this.alreadyAnswered = alreadyAnswered;
        this.correct = correct;
        this.incorrect = incorrect;
        this.alreadyDone = alreadyDone
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

    QuizzModule.prototype.bringToNought = function(){
        this.currentQuestIndex = 0;
        this.currentTestIndex = -1;
        this.currentTest = 0;
        this.alreadyAnswered = 0;
        this.correct = 0;
        this.incorrect = 0;
    };

    root.QuizzModule = QuizzModule;

}(window));