var socket = io();
$('#chat-submit').click(function () {
    var user = $('#chat-holder').attr('data-username');
    socket.emit('client message', user + ' : ' + $('#message').val());
    $('#message').val('');
});
socket.on('server message', function (msg) {
    $('#messages').append($('<li>').text(msg));
});