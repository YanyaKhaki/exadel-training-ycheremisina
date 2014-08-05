(function(root) {

    function Stats(app) {
        this.app = app;
    }

    Stats.prototype.addInfoToStats = function (currNumb, numb) {
        this.app.addInfo('correctAn', this.app.correct);
        this.app.addInfo('incorrectAn', this.app.incorrect);
        this.app.addInfo('currentNumb', currNumb);
        this.app.addInfo('numb', numb)
    };

    root.Stats = Stats;

}(window));