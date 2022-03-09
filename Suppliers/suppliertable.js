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

            var image = document.createElement("img")
            image.src = `data:image/png;base64,${supplier.Image}`
            image.className = 'imagescale'

            var SupplierImage = document.createElement("td")
            SupplierImage.className = 'productimage'
            SupplierImage.appendChild(image)

            var SupplierEmail = document.createElement("td")
            SupplierEmail.textContent = supplier.Email

            row.appendChild(SupplierImage);
            row.appendChild(SupplierId);
            row.appendChild(SupplierName);
            row.appendChild(SupplierNumber);
            row.appendChild(SupplierEmail);

            table.appendChild(row);
        });
    }

setInterval(() => {
    OpenRequest()

    request.send();
}, 5000)

OpenRequest()
request.send()