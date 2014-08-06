(function(root) {

    function QuizzApp() {
        //this.smth = smth;
    }

    QuizzApp.prototype.init = function() {
        this.questModule = new QuizzModule();
        this.questModule.createQuest();
        this.questModule.answerQuest();
        this.questModule.nextQuest();
        this.questModule.mainPage();
        this.persist();
        this.questModule.Persist.getFromLocalStorage()
    };

    QuizzApp.prototype.persist = function(){
        if ( this.questModule.Persist.currTestIndex != -1 ) {
            //debugger;
            this.questModule.getToQuizzApp(this.questModule.Persist.currTestIndex, this.questModule.Persist.currQuestIndex, this.questModule.Persist.alrAnswered, this.questModule.Persist.corr, this.questModule.Persist.incorr, this.questModule.Persist.alrDone);
            console.log(this.questModule.currentTestIndex);
            this.questModule.currentTest = quizData[this.questModule.currentTestIndex].questions;
            this.questModule.hideElements('listQ', 'question');
            this.questModule.openNextQuest(this.questModule.currentTest[this.questModule.currentQuestIndex]);
        }
    };

    root.QuizzApp = QuizzApp;

}(window));