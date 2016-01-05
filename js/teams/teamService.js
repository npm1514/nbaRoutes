angular.module('nbaRoutes').service('teamService', function ($http, $q) {

    this.addNewGame = function (gameObj) {
      var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
      if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
        gameObj.won = true;
      }
      else if (parseInt(gameObj.homeTeamScore) < parseInt(gameObj.opponentScore)){
        gameObj.won = false;
      }
      $http({
        method: 'POST',
        url: url,
        data: gameObj
      }).then(function(response) {
          return response;
      });
    };

    this.getTeamData = function (team) {
      var deferrer = $q.defer();
      var url2 = 'https://api.parse.com/1/classes/' + team;
      $http({
        method: 'GET',
        url: url2
      }).then(function(data) {
        var results = data.data.results;
        var wins = 0;
        var losses = 0;
        for(var i = 0; i < results.length; i++) {
          for (var prop in results) {
            if (prop.win) {
              wins++;
            }
            else {
              losses++;
            }
          }
        }
      });
      return deferrer.promise;
    };

});
