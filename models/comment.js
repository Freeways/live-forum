var connection = require('./db').connect;
exports.get = {
    commentAndUserByTopicId: function (id, cb) {
        connection.query('SELECT comment.*, user.name, user.photo FROM  comment  LEFT JOIN user ON comment.user_id = user.id WHERE topic_id=' + id, function (err, comments) {
            if (!err)
                cb(comments);
            else
                console.log('Error while performing Query.')
        })
    },
    commentsByTopicId: function (id, cb) {
        connection.query('SELECT * FROM  comment WHERE topic_id=' + id, function (err, comments) {
            if (!err)
                cb(comments);
            else
                console.log('Error while performing Query.')
        })
    },
    commentById: function (id, cb) {
        connection.query('SELECT * FROM  comment WHERE id=' + id, function (err, comments) {
            if (!err)
                cb(comments[0]);
            else
                console.log('Error while performing Query.')
        })
    }
}
exports.set = {
    comment: function (topicId, body, userId, cb) {
        console.log("INSERT INTO  comment (topic_id, body, user_id) " +
                "VALUES (" + topicId + ",  '" + body + "',  '" + userId + "')")
        connection.query("INSERT INTO  comment (topic_id, body, user_id) " +
                "VALUES (" + topicId + ",  '" + body + "',  '" + userId + "')",
                function (err, comment) {
                    if (!err)
                        cb(comment);
                    else
                        console.log('Error while performing Query.')
                })
    },
    editComment: function (id, body, cb) {
        connection.query("UPDATE  comment SET body='" + body +"' where id =" + id,
                function (err, comment) {
                    if (!err)
                        cb(comment);
                    else
                        console.log('Error while performing Query.')
                })
    },
    deleteComment: function (id, cb) {
        connection.query("DELETE FROM comment where id =" + id,
                function (err, comment) {
                    if (!err)
                        cb(comment);
                    else
                        console.log('Error while performing Query.')
                })
    }
}