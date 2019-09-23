$(function(){
    var socket = io.connect("http://localhost:3000");

    var message= $("#message");
    var username = $("#username");
    var sendMessage= $("#send-message");
    var sendUsername = $("#send-username");
    var chatroom = $("#chatroom");

    sendUsername.click(function(){
        socket.emit("changeUsername", {username: username.val()});
    });

    sendMessage.click(function(){
        socket.emit("new-message", {message: message.val()});
    });

    socket.on("new-message", (data) => {
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    });
});