import {MainUrl} from "./mainurl.js";

var RanOnce = false;

var parent = document.getElementById("cardholder");

var request = new XMLHttpRequest();

function OpenRequest() {
    request.open('GET',
        `${MainUrl}/loadfaq`,
        true
    );
}

    request.onload = function () {
        var data = JSON.parse(this.response)

        data.forEach(product => {
                var child = document.createElement('div')
                var qm = document.createElement('div')
                var q = product.Question
                var a = product.Answer
                var br = document.createElement('br')
                qm.className = 'fas fa-question-circle fa-2x block'
                child.className = 'col1 card ripple';
                child.append(qm)
                child.append(br)
                child.append(q)
                child.append(br)
                child.append(a)
                parent.append(child)
        });
    }

OpenRequest()
request.send()