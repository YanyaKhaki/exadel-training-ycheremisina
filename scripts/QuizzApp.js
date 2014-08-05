(function(root) {

    function QuizzApp() {
        //this.smth = smth;
    }

    QuizzApp.prototype.getToQuizzApp = function(currentTestIndex, currentQuestIndex, alreadyAnswered, correct, incorrect, alreadyDone) {
        this.currentTestIndex = currentTestIndex;
        this.currentQuestIndex = currentQuestIndex;
        this.alreadyAnswered = alreadyAnswered;
        this.correct = correct;
        this.incorrect = incorrect;
        this.alreadyDone = alreadyDone
    };

    QuizzApp.prototype.init = function(){

        this.questModule = new QuizzModule();
        this.questModule.createQuest();
        this.questModule.answerQuest();
        this.questModule.nextQuest();
        this.questModule.mainPage();
        this.questModule.Persist.getFromLocalStorage();

        //this.myRouter = new Router(this);

        if ( this.questModule.Persist.currTestIndex != -1 ) {
            this.getToQuizzApp(this.questModule.Persist.currTestIndex, this.questModule.Persist.currQuestIndex, this.questModule.Persist.alrAnswered, this.questModule.Persist.corr, this.questModule.Persist.incorr, this.questModule.Persist.alrDone);
            this.questModule.currentTest = quizData[this.questModule.currentTestIndex].questions;
            this.questModule.hideElements('listQ', 'question');
            this.questModule.openNextQuest(this.questModule.currentTest[this.questModule.currentQuestIndex]);
        }

    };

    root.QuizzApp = QuizzApp;

}(window));