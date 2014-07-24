(function (root) {

    function PersistanceModule() {
        this.currQuestIndex = 0;
        this.currTestIndex = 0;
        this.alrAnswered = 0;
        this.corr = 0;
        this.incorr = 0;
    }

    PersistanceModule.prototype.getStatistics = function(currQuestIndex, currTestIndex, alrAnswered, corr, incorr){
        this.currQuestIndex = currQuestIndex;
        this.currTestIndex = currTestIndex;
        this.alrAnswered = alrAnswered;
        this.corr = corr;
        this.incorr = incorr;
        this.pushStatistics();
    };

    PersistanceModule.prototype.getFromLocalStorage = function() {
        var myStat = JSON.parse(localStorage.getItem('myQuiz'));
        this.currQuestIndex = myStat.currQuestIndex;
        this.currTestIndex = myStat.currTestIndex;
        this.alrAnswered = myStat.alrAnswered;
        this.corr = myStat.corr;
        this.incorr = myStat.incorr;
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
        } else {

        }
    };

    root.PersistanceModule = PersistanceModule;

}(window));
