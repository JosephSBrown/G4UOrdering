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
    document.getElementById("menu").classList.toggle("menushow");
}

function chatshow() {
  document.getElementById("chatbox").classList.toggle("chat-show");
  document.getElementById("chatbubble").classList.toggle("spin");
  document.getElementById("input").classList.toggle("chat-show");
}

  window.onclick = function(event) {
    if (!event.target.matches('.notif')) {
      var dropdowns = document.getElementsByClassName("notifdropcontent");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('notifshow')) {
          openDropdown.classList.remove('notifshow');
        }
      }
    }
    if (!event.target.matches('.account')) {
        var dropdowns = document.getElementsByClassName("userdropcontent");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('usershow')) {
            openDropdown.classList.remove('usershow');
          }
        }
      }
  }
