function User(id, token, name, photo){
    this.facebook = {
        id: id,
        token: token,
        name: name,
        photo : photo.value
    };
};
exports.user = User;