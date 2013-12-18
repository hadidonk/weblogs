# Weblogs -- Simple Parser for Published Weblog Lists on Weblogs.com

[![NPM](https://nodei.co/npm/weblogs.png)](https://nodei.co/npm/weblogs/)

## Really easy to use

Weblogs lets you parse the published weblog lists easily and quickly.

```javascript
var Weblogs = require('weblogs');

var weblogs = new Weblogs();
weblogs.on('changes', function (changes) {
    console.log(changes['version']); // Weblogs API version
    console.log(changes['updated']); // Datestamp Last Updated
    console.log(changes['count']); // # weblogs published
    console.log(changes['weblogs']); // Array of weblogs objects which has 3 attributes (name, url, when)
});
weblogs.on('error', function (msg) {
    console.log(msg['error']); // error message can be null
    console.log(msg['statusCode']); // statusCode can be null if error exists else returns HTTP status code
});

// latest changes in 60 minutes
weblogs.changes();
// or
// latest changes in 5 minutes
weblogs.shortChanges();
```