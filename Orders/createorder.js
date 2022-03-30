import {MainUrl} from "../mainurl.js";
import {GetCookie} from "../logincookie.js"

window.onload = function() {
    var staffId = document.getElementById("staffId").value;
    var currentdate = new Date(); 
    var datetime = ('0' + currentdate.getDate()).slice(-2) + "/"
                    + ('0' +(currentdate.getMonth()+1)).slice(-2)  + "/" 
                    + ('0' + currentdate.getFullYear()).slice(-2) + " @ "  
                    + ('0' + currentdate.getHours()).slice(-2) + ":"  
                    + ('0' + currentdate.getMinutes()).slice(-2) + ":" 
                    + ('0' + currentdate.getSeconds()).slice(-2);
    var quantity = document.getElementById("quantity").value;
    document.getElementById("datetime").value = datetime;    
}

var productName = document.getElementById("productName");

var Fulljson = []

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

        ]
    }
    productTable.forEach(product => {
        if (product) {
            if (product.productCode && product.supplierId && product.quantity) {
                OrderTable.Products.push({
                    ProductCode: product.productCode,
                    SupplierId: product.supplierId,
                    Quantity: product.quantity
                })
            }
        }
    })

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

var productTable = []

var add = document.getElementById("plus")
add.onclick = function() {
    var clone = document.getElementById("orderinfo").cloneNode(true)
    clone.id = Math.random()
    clone.style.display = "block"
    document.getElementById("ubertable").appendChild(clone)

    var quantity = null
    var supp = null
    var product = null

    var descendants = clone.querySelectorAll("*")
    descendants.forEach(desc => {
        if (desc.className.includes("quantity")) {
            quantity = desc
        }
        else if (desc.className == "supplier") {
            supp = desc
        }
        else if (desc.className == "product") {
            product = desc
        }
    })

    var index = productTable.length
    clone.className = index
    productTable[index] = {
        productCode: null,
        supplierId: null,
        quantity: null,
    }

    product.onchange = function(selectObject) {
        var procode = selectObject.target.value
        if (procode) {
            for (var i = supp.options.length -1; i > 0; i--) {
                supp.remove(i);
            }
            Fulljson.forEach(product => {
                if (product.Code == procode) {
                    product.Suppliers.forEach(supplier => {
                        var supplieroption = document.createElement("option");
                        supplieroption.text = supplier.Name;
                        supplieroption.value = supplier.Code
    
                        supp.appendChild(supplieroption);
                    })
                } 
            })
        }

        productTable[index].productCode = procode
        productTable[index].supplierId = null
    }

    supp.onchange = function(selectObject) {
        var procode = selectObject.target.value
        productTable[index].supplierId = procode
    }

    quantity.onchange = function(selectObject) {
        var procode = selectObject.target.value
        productTable[index].quantity = procode
    }
    console.log(productTable)
    
}

var minus = document.getElementById("minus")
minus.onclick = function() {
    var select = document.getElementById("ubertable")
    var lastChild = select.lastChild
    var index = parseInt(lastChild.className)
    if (index) {
        productTable[index] = null
        select.removeChild(lastChild)
    } 
}