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

var SupId = document.getElementById("SupId")
var SupName = document.getElementById("SupName")
var phone = document.getElementById("phone")
var email = document.getElementById("email")
var l1 = document.getElementById("line1")
var l2 = document.getElementById("line2")
var l3 = document.getElementById("line3")
var l4 = document.getElementById("line4")
var postcode = document.getElementById("postcode")



var submit = document.getElementById("submit")

submit.onclick = function() {
    var request = new XMLHttpRequest();

    var url = `${MainUrl}/createsupplier`

    var NewData = {
        SupplierId: String(SupId.value).toUpperCase(),
        SupplierName: SupName.value,
        SupplierPhone: phone.value,
        SupplierEmail: email.value,
        LineOne: l1.value,
        LineTwo: l2.value,
        LineThree: l3.value,
        LineFour: l4.value,
        PostCode: postcode.value
    }

    var urlData = JSON.stringify(NewData)

    url = `${url}?data=` + encodeURIComponent(urlData);

    request.open('GET',
        url,
        true
        );

        request.setRequestHeader("Content-Type", "application/json");

        request.send()

}