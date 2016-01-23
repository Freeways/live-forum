function User(id, token, name){
    this.facebook = {
        id: id,
        token: token,
        name: name
    };
};
exports.user = User;