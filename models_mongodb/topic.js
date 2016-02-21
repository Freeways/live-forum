/*
var connection = require('./db').connect;
exports.get = {
    topics: function (cb) {
        connection.query('SELECT topic.*, COUNT( comment.id ) as comments ' +
                'FROM  topic LEFT JOIN comment ON topic.id = comment.topic_id ' +
                'GROUP BY topic.id', function (err, rows) {
                    if (!err)
                        cb(rows);
                    else
                        console.log(err);
                })
    },
    topicById: function (id, cb) {
        connection.query('SELECT * FROM  topic WHERE id=' + id, function (err, topics) {
            if (!err)
                cb(topics[0]);
            else
                console.log(err);
        })
    }
};
*/
