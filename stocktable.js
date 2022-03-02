import {MainUrl} from "./mainurl.js";

var RanOnce = false;

var table = document.getElementById("StockTable");

var request = new XMLHttpRequest();

function OpenRequest() {
    request.open('GET',
        `${MainUrl}/loadproduct`,
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
            ProductImage.className = 'productimage'
            ProductImage.appendChild(image)

            var ProductType = document.createElement("td")
            ProductType.textContent = product.Type

            row.appendChild(ProductImage);
            row.appendChild(ProductId);
            row.appendChild(ProductName);
            row.appendChild(ProductType);
            row.appendChild(ProductStock);

            table.appendChild(row);
        });
    }

setInterval(() => {

    OpenRequest()

    request.send();
}, 5000)

OpenRequest()
request.send()