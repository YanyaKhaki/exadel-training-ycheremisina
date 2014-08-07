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
        this.questModule.myPersist.getFromLocalStorage();
        $(window).on('hashchange', { param: this }, function(evt){
            evt.data.param.questModule.myRouter.onURLChange();
        });
    };

    QuizzApp.prototype.persist = function(){
        if ( this.questModule.myPersist.currTestIndex != -1 ) {
            //debugger;
            this.questModule.getToQuizzApp(this.questModule.myPersist.currTestIndex, this.questModule.myPersist.currQuestIndex, this.questModule.myPersist.alrAnswered, this.questModule.myPersist.corr, this.questModule.myPersist.incorr, this.questModule.myPersist.alrDone);
            console.log(this.questModule.currentTestIndex);
            this.questModule.currentTest = quizData[this.questModule.currentTestIndex].questions;
            this.questModule.hideElements('listQ', 'question');
            this.questModule.openNextQuest(this.questModule.currentTest[this.questModule.currentQuestIndex]);
        }
    };

    root.QuizzApp = QuizzApp;

}(window));