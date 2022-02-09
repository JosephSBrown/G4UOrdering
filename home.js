function darkmode() {
    var body = document.body;
    body.classList.toggle('dark-mode');
}

function userclick() {
document.getElementById("userdrop").classList.toggle("usershow");
}

function notifclick() {
document.getElementById("notifdrop").classList.toggle("notifshow");
}

function menuclick(x) {
    x.classList.toggle("change");
}

