
function all(matchHistory) {
    return {
        then: function(callback) {
            var allGames = [];
            matchHistory.maximumMatches(100).then(function(error, body) {
                if(error) {
                    callback(error)
                } else {
                    var games = JSON.parse(body).result.matches;
                    allGames = allGames.concat(games);
                    getNext(matchHistory, games[games.length-1].match_id, function(moreGames) {
                        allGames = allGames.concat(moreGames);
                        callback(null, allGames);
                    });
                }
            });
        }
    };
}

function getNext(matchHistory, gameId, callback) {
    matchHistory
        .startAtMatchId(gameId)
        .then(function(error, body) {
            var json = JSON.parse(body);
            var games = json.result.matches;
            if( json.result.results_remaining === 0 ) {
                callback(games);
            } else {
                getNext(matchHistory, games[games.length-1].match_id, function(moreGames) {
                    games = games.concat(moreGames);
                    callback(games);
                });
            }
        });
}

module.exports = all;
