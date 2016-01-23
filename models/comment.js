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