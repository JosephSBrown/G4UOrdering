import {MainUrl} from "../mainurl.js";

var RanOnce = false;

var table = document.getElementById("OrderTable");

var request = new XMLHttpRequest();

function OpenRequest() {
    request.open('GET',
        `${MainUrl}/loadstaff`,
        true
    );
}

    request.onload = function () {
        var data = JSON.parse(this.response)
        console.log(data)

        var dataCount = data.length +1;

        if (!RanOnce) {

            RanOnce = true;

        }

        else {
            for (var i = table.rows.length -1; i > 0; i--) {
                    table.deleteRow(i);
            }
        }    

        data.forEach(product => {
            var row = document.createElement("tr");

            var EmployeeId = document.createElement("td")
            EmployeeId.textContent = product.EmployeeId

            var JoinDate = document.createElement("td");
            var date = new Date(product.JoinDate);
            var day = date.getDate().toString();
            var month = (date.getMonth() +1).toString();
            month = month.length > 1 ? month: '0' + month;
            var year = date.getFullYear().toString();
            var hour = date.getHours().toString();
            hour = hour.length > 1 ? hour: '0' + hour;
            var minutes = date.getMinutes().toString();
            minutes = minutes.length > 1 ? minutes: '0' + minutes;
            var seconds = date.getSeconds().toString();
            seconds = seconds.length > 1 ? seconds: '0' + seconds;
            
            if (product.JoinDate){
                JoinDate.textContent = (day+"/"+month+"/"+year+" "+hour+":"+minutes+":"+seconds);
            }
            else {
                JoinDate.textContent = 'No Date'
            }

            var Name = document.createElement("td")
            Name.textContent = `${product.Title} ${product.FirstName} ${product.LastName}`

            var phone = document.createElement("td")
            phone.textContent = product.PhoneNumber

            var email = document.createElement("td")
            email.textContent = product.WorkEmail

            var role = document.createElement("td")
            role.textContent = product.JobTitle

            row.appendChild(EmployeeId);
            row.appendChild(Name);
            row.appendChild(role);
            row.appendChild(JoinDate);
            row.appendChild(email);
            row.appendChild(phone);

            table.appendChild(row);
        });
    }

setInterval(() => {
    OpenRequest()

    request.send();
}, 5000)

OpenRequest()
request.send()