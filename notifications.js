import {MainUrl} from '/mainurl.js';

var request = new XMLHttpRequest()
var notifications = document.getElementById("notifdrop")
var notifno = document.getElementById("notifno")

function OpenRequest() {
    request.open('GET',
        `${MainUrl}/notify`,
        true
    );
}

request.onload = function() {
    var data = JSON.parse(this.response)
    for (var i = notifications.children.length-1; i >= 0; i--) {
        notifications.removeChild(notifications.children[i])
    }
    data.forEach(product => {
        var Notif = document.createElement("a")
        Notif.textContent = `${product.Name} has reached a Critical Stock Level...`
        notifications.appendChild(Notif)        
    });
    notifno.innerHTML = notifications.children.length
} 
setInterval(() => {
    OpenRequest()

    request.send();
}, 5000)

OpenRequest()
request.send()