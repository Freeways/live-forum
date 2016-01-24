var connection = require('./db').connect;
function User(id, token, name, photo){
    this.facebook = {
        id: id,
        token: token,
        name: name,
        photo : photo.value
    };
};
exports.user = User;
exports.get = {
    userById: function (id, cb) {
        connection.query('SELECT * FROM  user WHERE id=' + id, function (err, users) {
            if (!err)
                cb(users[0]);
            else
                console.log('Error while performing Query.')
        })
    },
    users: function (cb) {
        connection.query('SELECT * FROM  user', function (err, users) {
            if (!err)
                cb(users);
            else
                console.log('Error while performing Query.')
        })
    },
    usersByTopicId: function (id, cb) {
        connection.query('SELECT user.* FROM `user` left join comment on comment.user_token = user.id Left join topic on topic.id = comment.topic_id where topic.id = ' + id,
        function (err, users) {
            if (!err)
                cb(users);
            else
                console.log('Error while performing Query.')
        })
    }
}
exports.set = {
    comment: function (id, name, photo, cb) {
        connection.query("INSERT INTO  user (id, name, photo)" +
                "VALUES (" + id + ",  '" + name + "',  '" + photo + "')",
                function (err, user) {
                    if (!err)
                        cb(user);
                    else
                        console.log('Error while performing Query.')
                })
    }
}