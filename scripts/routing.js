(function(root){

    function Router(app) {
        this.currTest = 0;
        this.currQuest = 0;
        this.app = app;
    }

    Router.prototype.getStats = function(currTest, currQuest){
        this.currTest = currTest + 1;
        this.currQuest = currQuest + 1
    };

    Router.prototype.createURL = function() {
        window.location.hash = '#test/'+ this.currTest + '/' + this.currQuest;
        //this.app.openRemainingData()
    };

    Router.prototype.cleanURL = function() {
        window.location.hash = ''
    };

    Router.prototype.createQuestFromURL = function(myTestIndex, myQuestIndex) {
        this.currTest = myTestIndex;
        this.currQuest = myQuestIndex;
        this.createURL();
        this.app.currentTestIndex = this.currTest;
        this.app.currentQuestIndex = this.currQuest;
        this.currentTest = quizData[myTestIndex].questions;
        this.app.openRemainingData()
    };

    Router.prototype.onURLChange = function() {
        //debugger;
        var router = window.location.hash.split('/');
        var myTestIndex = router[1];
        var myQuestIndex = router[2];
        console.log(myTestIndex,myQuestIndex);
        if ( 0 < myTestIndex && myTestIndex < quizData.length + 1 ) {
            if ( 0 < myQuestIndex && myQuestIndex < this.app.currentTest.length ) {
                this.createQuestFromURL(myTestIndex, myQuestIndex);
            } else {
                this.createQuestFromURL(myTestIndex, 1);
            }
        } else {
            this.app.hideElements('question', 'listQ');
            this.app.bringToNought();
            this.app.addInfoToStats(this.app.questModule.currentQuestIndex,'0')
        }
    };

    root.Router = Router;

}(window));