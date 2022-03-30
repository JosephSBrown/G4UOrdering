import {MainUrl} from "../mainurl.js";
import {GetCookie} from "../logincookie.js"

window.onload = function() {
    var currentdate = new Date(); 
    var datetime = ('0' + currentdate.getDate()).slice(-2) + "/"
                    + ('0' +(currentdate.getMonth()+1)).slice(-2)  + "/" 
                    + ('0' + currentdate.getFullYear()).slice(-2) + " @ "  
                    + ('0' + currentdate.getHours()).slice(-2) + ":"  
                    + ('0' + currentdate.getMinutes()).slice(-2) + ":" 
                    + ('0' + currentdate.getSeconds()).slice(-2);
    document.getElementById("datetime").value = datetime;    
}

var productName = document.getElementById("productName");
var supplierName = document.getElementById("supplierName");

var Fulljson = []
var productsTable = []

var request = new XMLHttpRequest();

function OpenRequest() {
    request.open('POST',
        `${MainUrl}/createorder`,
        true
    );

    request.setRequestHeader("Content-Type", "application/json");
}
var submit = document.getElementById("submit")
submit.onclick = function() {
    var OrderTable = {
        StaffId: GetCookie('loggedin'),
        Products: [
            {
                ProductCode: "FP59",
                SupplierId: "SH",
                Quantity: 1
            },
            {
                ProductCode: "KST01",
                SupplierId: "BS",
                Quantity: 1
            }
        ]
    }

    OpenRequest()
    var data = JSON.stringify(OrderTable);
    request.send(data)
}

var request2 = new XMLHttpRequest();

    request2.open("GET",
        `${MainUrl}/loadproductsupplier`,
        true
    )

    request2.onload = function() {
        var data = JSON.parse(this.response)
            Fulljson = data
            data.forEach(product => {
                var productoption = document.createElement("option");
                productoption.text = product.Name;
                productoption.value = product.Code

                productName.appendChild(productoption);
            });
            
    }

request2.send()

productName.onchange = function(selectObject) {
    var procode = selectObject.target.value
    if (procode) {
        for (var i = supplierName.options.length -1; i > 0; i--) {
            supplierName.remove(i);
        }
        Fulljson.forEach(product => {
            if (product.Code == procode) {
                product.Suppliers.forEach(supplier => {
                    var supplieroption = document.createElement("option");
                    supplieroption.text = supplier.Name;
                    supplieroption.value = supplier.Code

                    supplierName.appendChild(supplieroption);
                })
            } 
        })
    }
}

var add = document.getElementById("plus")
add.onclick = function() {
    var clone = document.getElementById("orderinfo").cloneNode(true)
    clone.id = Math.random()
    document.getElementById("ordertable").appendChild(clone)
}

var minus = document.getElementById("minus")
minus.onclick = function() {
    var select = document.getElementById("ordertable")
    select.removeChild(select.lastChild)
}