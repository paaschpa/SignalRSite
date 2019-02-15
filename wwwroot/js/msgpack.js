"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/msgpackhub")
    .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
    .build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (data) {
    var msg = data.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = data.user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var msg = { user: user, message: message };
    var t0 = performance.now();
    for (var i = 0; i <= 150; i++) {
        connection.invoke("SendMessage", msg).catch(function(err) {
            return console.error(err.toString());
        });
    }
    var t1 = performance.now();
    console.log(t1 - t0 + " + in milliseconds");
    event.preventDefault();
});