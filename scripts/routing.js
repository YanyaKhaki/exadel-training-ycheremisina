(function(root){

    function Router(app) {
        this.currTest = 0;
        this.currQuest = 0;
        this.app = app;
    }

    Router.prototype.getStats = function(currTest, currQuest){
        this.currTest = currTest + 1;
        this.currQuest = currQuest + 1;
    };

    Router.prototype.createURL = function() {
        window.location.hash = '#test/'+ this.currTest + '/' + this.currQuest + '/';
    };

    Router.prototype.cleanURL = function() {
        window.location.hash = '';
    };

    Router.prototype.onURLChange = function() {
        //debugger;
        var myTestIndex = window.location.hash.charAt(6);
        var myQuestIndex = window.location.hash.charAt(8);
        console.log(myTestIndex,myQuestIndex);
        if ( 0 < myTestIndex && myTestIndex < quizData.length + 1 ) {
            if ( 0 < myQuestIndex && myQuestIndex < this.app.currentTest.length ) {
                this.currTest = myTestIndex;
                this.currQuest = myQuestIndex;
                this.createURL();
                this.app.currentTestIndex = this.currTest;
                this.app.currentQuestIndex = this.currQuest;
                this.currentTest = quizData[myTestIndex].questions;
                this.app.openRemainingData();
            } else {
                this.currTest = myTestIndex;
                this.currQuest = 1;
                this.createURL();
                this.app.currentTestIndex = this.currTest;
                this.app.currentQuestIndex = this.currQuest;
                this.currentTest = quizData[myTestIndex].questions;
                //console.log(this.app.currentQuestIndex);
                this.app.openRemainingData();
            }
        } else {
            var elem1 = document.getElementsByClassName('question')[0];
            var elem2 = document.getElementsByClassName('listQ')[0];
            elem1.style.display = 'none';
            elem2.style.display = 'block';
            this.app.currentQuestIndex = 0;
            this.app.currentTestIndex = 0;
            this.app.currentTest = 0;
            this.app.alreadyAnswered = 0;
            this.app.correct = 0;
            this.app.incorrect = 0;
            //this.Persist.cleanStatistics();
            this.app.addInfo('correctAn', this.app.correct);
            this.app.addInfo('incorrectAn', this.app.incorrect);
            this.app.addInfo('currentNumb', this.app.currentQuestIndex);
            this.app.addInfo('numb','0');
            //window.location.href = 'index.html'
        }
    };

    root.Router = Router;

}(window));