import {MainUrl} from "./mainurl.js";

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

            row.appendChild(OrderNo);
            row.appendChild(OrderDate);
            row.appendChild(StaffID);
            row.appendChild(OrderStatus);
            row.appendChild(OrderQuantity);

            table.appendChild(row);
        });
    }

setInterval(() => {
    OpenRequest()

    request.send();
}, 5000)

OpenRequest()
request.send()