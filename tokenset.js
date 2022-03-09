import {GetCookie} from "../logincookie.js";

document.getElementById('token').textContent = `Logged in as ${GetCookie('loggedin')}`

try {
    document.getElementById('accounttoken').textContent = `Account - ${GetCookie('loggedin')}`
}
catch (error) {
    console.log(error)
}

try {
    document.getElementById('profiletoken').textContent = `Staff Id: ${GetCookie('loggedin')}`
}
catch (error) {
    console.log(error)
}

if (parseInt(GetCookie('permissionlevel')) > 0) {
    document.getElementById('admintab').hidden = false;
    console.log('idc')
  }
  else {
    document.getElementById('admintab').style.display = 'none';
    console.log('idk')
  }