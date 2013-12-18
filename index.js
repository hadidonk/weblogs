var request = require('request')
    , cheerio = require('cheerio')
    , util = require('util')
    , events = require('events');

var shortChangesURL = 'http://rpc.weblogs.com/shortChanges.xml'
    , changesURL = 'http://rpc.weblogs.com/changes.xml';

function Weblogs() {
    events.EventEmitter.call(this);
    var self = this;

    var loadCheerio = function (err, response, xml) {
        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(xml, {
                ignoreWhitespace: true,
                xmlMode: true
            });

            var changes = {}
                , updatesEle = $.root().children()[0];

            changes = updatesEle.attribs;
            changes['weblogs'] = [];
            updatesEle.children.forEach(function (ele, i, arr) {
                changes['weblogs'].push(ele.attribs);
            });
            self.emit('changes', changes);
        } else {
            var msg = null
                , statusCode = null;

            if (err) { msg = err.message; }
            if (response && response.statusCode) { statusCode = response.statusCode; }
            self.emit('error', {error: msg, statusCode: statusCode});
        }
    }

    this.shortChanges = function () {
        request(shortChangesURL, loadCheerio);
    }
    this.changes = function () {
        request(changesURL, loadCheerio);
    }
}

util.inherits(Weblogs, events.EventEmitter);

module.exports = Weblogs;