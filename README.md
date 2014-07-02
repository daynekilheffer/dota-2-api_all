# dota-2-api all

The `all` project provides a wrapper around [dota-2-api](http://github.com/daynekilheffer/dota-2-api) for retrieving all contents of a given API call.  Most APIs contain some sort of limit (100), but also provide context as to how many are left.  This utility is to prevent boilerplate logic and simply keeps calling the API until all results are received.

## Usage

_Currently only supporting match history_

### matchHistory

```javascript
var dota2 = ...
var all = require('dota-2-api_all');

var matchHistory = dota2.matchHistory().accountId(10000000);

all.matchHistory(matchHistory).then(function(error, games) {
    // error: any error received during processing
    // games: an array containing all games
});
```
