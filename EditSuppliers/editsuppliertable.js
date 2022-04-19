import {MainUrl} from "../mainurl.js";

var RanOnce = false;

var table = document.getElementById("SupplierTable");

var request = new XMLHttpRequest();

function OpenRequest() {
    request.open('GET',
        `${MainUrl}/supplier`,
        true
    );
}

    request.onload = function () {
        var data = JSON.parse(this.response)

        var dataCount = data.length +1;

        if (!RanOnce) {

            RanOnce = true;

        }

        else {
            for (var i = table.rows.length -1; i > 0; i--) {
                    table.deleteRow(i);
            }
        }    

        data.forEach(supplier => {
            var row = document.createElement("tr");

            var SupplierId = document.createElement("td")
            SupplierId.textContent = supplier.Code
            SupplierId.className = 'productimage'

            var SupplierName = document.createElement("td")
            SupplierName.textContent = supplier.Name

            var SupplierNumber = document.createElement("td")
            SupplierNumber.textContent = supplier.PhoneNumber

            var SupplierEmail = document.createElement("td")
            SupplierEmail.textContent = supplier.Email

            var Delete = document.createElement("td")
            var Button = document.createElement("button")
            Button.appendChild(document.createTextNode('Delete'));
            Delete.appendChild(Button)

            row.appendChild(SupplierId);
            row.appendChild(SupplierName);
            row.appendChild(SupplierNumber);
            row.appendChild(SupplierEmail);
            row.appendChild(Delete);

            table.appendChild(row);

            Button.onclick = function() {
                var request2 = new XMLHttpRequest()
                var data = {
                    SupplierId: supplier.Code,

                }
                data = JSON.stringify(data)
                var url = `${MainUrl}/deletesupplier`
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