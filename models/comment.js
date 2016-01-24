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
    comment: function (topicId, body, name, pic, cb) {
        connection.query("INSERT INTO  comment (topic_id ,body ,username ,userpic)" +
                "VALUES ('" + topicId + "',  '" + body + "',  '" + name + "',  '" + pic + "')",
        function (err, comment) {
                    if (!err)
                        cb(comment);
                    else
                        console.log('Error while performing Query.')
                })
    }
}