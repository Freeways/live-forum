var connection = require('./db').connect;
exports.get = {
    commentsByTopicId: function (id, cb) {
        connection.query('SELECT * FROM  comment WHERE topic_id=' + id, function (err, comments) {
            if (!err)
                cb(comments);
            else
                console.log('Error while performing Query.')
        })
    }
}
exports.set = {
    comment: function (topicId, body, userId, cb) {
        connection.query("INSERT INTO  comment (topic_id, body, user_token)" +
                "VALUES (" + topicId + ",  '" + body + "',  '" + userId + "')",
                function (err, comment) {
                    if (!err)
                        cb(comment);
                    else
                        console.log('Error while performing Query.')
                })
    }
}