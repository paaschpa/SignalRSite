
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/streamHub")
    .build();

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var t0 = performance.now();
    for (var i = 0; i <= 150; i++) {
        connection.stream("DelayCounter", user, message)
            .subscribe({
                next: (item) => {
                    var li = document.createElement("li");
                    li.textContent = item;
                    document.getElementById("messagesList").appendChild(li);
                },
                //complete: () => {
                //    var li = document.createElement("li");
                //    li.textContent = "Stream completed";
                //    document.getElementById("messagesList").appendChild(li);
                //},
                error: (err) => {
                    var li = document.createElement("li");
                    li.textContent = err;
                    document.getElementById("messagesList").appendChild(li);
                },
            });
    }
    var t1 = performance.now();
    console.log(t1 - t0 + " + in milliseconds");
    event.preventDefault();
});



document.getElementById("streamButton").addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
    try {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;

        connection.stream("DelayCounter", user, message)
            .subscribe({
                next: (item) => {
                    var li = document.createElement("li");
                    li.textContent = item;
                    document.getElementById("messagesList").appendChild(li);
                },
                complete: () => {
                    var li = document.createElement("li");
                    li.textContent = "Stream completed";
                    document.getElementById("messagesList").appendChild(li);
                },
                error: (err) => {
                    var li = document.createElement("li");
                    li.textContent = err;
                    document.getElementById("messagesList").appendChild(li);
                },
            });
    }
    catch (e) {
        console.error(e.toString());
    }
    event.preventDefault();
}));

(() => __awaiter(this, void 0, void 0, function* () {
    try {
        yield connection.start();
    }
    catch (e) {
        console.error(e.toString());
    }
}))();  