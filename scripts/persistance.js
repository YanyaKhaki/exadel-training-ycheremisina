(function (root) {

    function PersistanceModule() {
        this.currQuestIndex = 0;
        this.currTestIndex = 0;
        this.alrAnswered = 0;
        this.corr = 0;
        this.incorr = 0;
    }

    PersistanceModule.prototype.getStatistics = function(currQuestIndex, currTest, alrAnswered, corr, incorr, alrDone){
        this.currQuestIndex = currQuestIndex + 1;
        this.currTest = currTest;
        this.alrAnswered = alrAnswered;
        this.corr = corr;
        this.incorr = incorr;
        this.alrDone = alrDone;
        this.pushStatistics();
    };

    PersistanceModule.prototype.getFromLocalStorage = function() {
        var myStat = JSON.parse(localStorage.getItem('myQuiz'));
        this.currQuestIndex = myStat.currQuestIndex;
        this.currTest = myStat.currTest;
        this.alrAnswered = myStat.alrAnswered;
        this.corr = myStat.corr;
        this.incorr = myStat.incorr;
        this.alrDone = myStat.alrDone;
    };

    PersistanceModule.prototype.pushStatistics = function() {
        localStorage.setItem('myQuiz', JSON.stringify(this))
    };

    PersistanceModule.prototype.LSisNotEmpty = function() {
        return localStorage['myQuiz']
    };

    PersistanceModule.prototype.cleanStatistics = function() {
        localStorage.removeItem('myQuiz')
    };

    PersistanceModule.prototype.parseJSON = function() {
        if (this.LSisNotEmpty()) {
            JSON.parse(localStorage.getItem('myQuiz', JSON.stringify(this)))
        } /*else {

        }*/
    };

    root.PersistanceModule = PersistanceModule;

}(window));
