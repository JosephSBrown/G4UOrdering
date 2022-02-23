import {MainUrl} from "./mainurl.js";

var RanOnce = false;

var table = document.getElementById("StockTable");

setInterval(() => {
    var request = new XMLHttpRequest();

    request.open('GET',
        `${MainUrl}/loadproduct`,
        true
    );

    request.onload = function () {
        var data = JSON.parse(this.response)

        var dataCount = data.length +1;

        if (!RanOnce) {

            RanOnce = true;

        }

        else {
            for (var i = dataCount; i > 1; i--) {
                table.deleteRow(i);
            }
        }    

        data.forEach(product => {
            var row = document.createElement("tr");

            var ProductId = document.createElement("td")
            ProductId.textContent = product.Code

            var ProductName = document.createElement("td")
            ProductName.textContent = product.Name

            var ProductStock = document.createElement("td")
            ProductStock.textContent = product.Stock

            var image = document.createElement("img")
            image.src = `data:image/png;base64,${product.Image}`
            image.className = 'imagescale'

            var ProductImage = document.createElement("td")
            ProductImage.appendChild(image)

            row.appendChild(ProductId);
            row.appendChild(ProductName);
            row.appendChild(ProductStock);
            row.appendChild(ProductImage);

            table.appendChild(row);
        });
    }

    request.send();
}, 5000)