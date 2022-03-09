import {MainUrl} from "./mainurl.js";

var RanOnce = false;

var staffId = document.getElementById("staffId").value;
var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
var orderNo = document.getElementById("orderNo").value;
var quantity = document.getElementById("quantity").value;
var status = document.getElementById("status").value;
var productId = document.getElementById("productId").value;
var productName = document.getElementById("productName").value;
var supplierId = document.getElementById("supplierId").value;
var supplierName = document.getElementById("supplierName").value;

setInterval(() => {
    var request = new XMLHttpRequest();

    request.open('GET',
        `${MainUrl}/supplier`,
        true
    );

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

            //var image = document.createElement("img")
            //image.src = `data:image/png;base64,${product.Image}`
            //image.className = 'imagescale'

            //var ProductImage = document.createElement("td")
            //ProductImage.className = 'productimage'
            //ProductImage.appendChild(image)

            var SupplierEmail = document.createElement("td")
            SupplierEmail.textContent = supplier.Email

            //row.appendChild(ProductImage);
            row.appendChild(SupplierId);
            row.appendChild(SupplierName);
            row.appendChild(SupplierNumber);
            row.appendChild(SupplierEmail);

            table.appendChild(row);
        });
    }

    request.send();
}, 5000)