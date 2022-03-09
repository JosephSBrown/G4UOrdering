import { MainUrl } from "../mainurl.js";

var loginbutton = document.getElementById('login-button')
var usernameEntry = document.getElementById('login-username')
var passwordEntry = document.getElementById('login-password')
loginbutton.onclick = function() {
    var username = usernameEntry.value
    var password = passwordEntry.value

    var request = new XMLHttpRequest();



    var url = `${MainUrl}/login`
    var dataToEncode = {

        Username: username,
        Password: password

    }
    var urlData = JSON.stringify(dataToEncode)
    url = `${url}?data=` + encodeURIComponent(urlData);
    request.open('GET',

        url,

        true

    );
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        var data = this.response;

        if (data === "true") {

            document.cookie = `loggedin=${username}`;



            window.location.href = "../Dashboard/dashboard.html";

        }

        else {

            alert("Invalid Username or Password")

        }

    }

   

    request.send()
}