import {MainUrl} from "../mainurl.js";
import { GetCookie } from "../logincookie.js";

var RanOnce = false;

var table = document.getElementById("OrderTable");

var request = new XMLHttpRequest();

function OpenRequest() {
    request.open('GET',
        `${MainUrl}/loadorder`,
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

            var OrderNo = document.createElement("td")
            OrderNo.textContent = product.OrderNumber

            var OrderDate = document.createElement("td");
            var date = new Date(product.DateSent);
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
            
            if (product.DateSent){
                OrderDate.textContent = (day+"/"+month+"/"+year+" "+hour+":"+minutes+":"+seconds);
            }
            else {
                OrderDate.textContent = 'No Date'
            }

            var StaffID = document.createElement("td")
            StaffID.textContent = product.StaffId

            var OrderStatus = document.createElement("td")
            OrderStatus.textContent = product.Status

            var OrderQuantity = document.createElement("td")
            OrderQuantity.textContent = product.Quantity

            var Accept = document.createElement("td")
            var AccButton = document.createElement("button")
            AccButton.appendChild(document.createTextNode('Accept'));
            Accept.appendChild(AccButton)

            var Decline = document.createElement("td")
            var DecButton = document.createElement("button")
            DecButton.appendChild(document.createTextNode('Decline'));
            Decline.appendChild(DecButton)

            row.appendChild(OrderNo);
            row.appendChild(OrderDate);
            row.appendChild(StaffID);
            row.appendChild(OrderStatus);
            row.appendChild(Accept)
            row.appendChild(Decline)

            table.appendChild(row);

            AccButton.onclick = function() {
                var request2 = new XMLHttpRequest()

                var permissionlevel = parseInt(GetCookie("permissionlevel"))
                if (permissionlevel == 1) {
                    permissionlevel = "Manager"
                }
                else if (permissionlevel == 2) {
                    permissionlevel = "Quality"
                }
                else if (permissionlevel == 3) {
                    permissionlevel = "All"
                }

                var data = {
                    OrderNumber: product.OrderNumber,
                    AuthoriseLevel: permissionlevel,
                }
                data = JSON.stringify(data)
                var url = `${MainUrl}/orderauthorise`
                url = `${url}?data=`+encodeURIComponent(data)
                request2.open("GET", url, true)
                request2.setRequestHeader("Content-Type", "application/json")
                request2.send()
            }

            DecButton.onclick = function() {
                var request2 = new XMLHttpRequest()
                var data = {
                    OrderNumber: product.OrderNumber,

                }
                data = JSON.stringify(data)
                var url = `${MainUrl}/deleteorder`
                url = `${url}?data=`+encodeURIComponent(data)
                request2.open("GET", url, true)
                request2.setRequestHeader("Content-Type", "application/json")
                request2.send()
            }
        });
    }

setInterval(() => {
    OpenRequest()

    request.send();
}, 1000)

OpenRequest()
request.send()