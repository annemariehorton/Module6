function MenuChoice() //Define section visibility
{
    if (document.getElementById("menu").value =="Show Section 1")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Show Section 2")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Show Section 3")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
}

//Function for Section 1 - to create new customer
function CreateCustomer()
{
 var objRequest = new XMLHttpRequest();
 var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";

 var customerid = document.getElementById("custid").value;
 var customername = document.getElementById("custname").value;
 var customercity = document.getElementById("custcity").value;

 var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';

 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
 {
 var result = JSON.parse(objRequest.responseText);
 OperationResult(result);
 }
 }

 objRequest.open("POST", url, true);
 objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 objRequest.send(newcustomer);

}
function OperationResult(output)
{
 if (output.WasSuccessful == 1)
 {
 document.getElementById("customerresult").innerHTML = "The customer was added successfully!"
 }
 else
 {
 document.getElementById("customerresult").innerHTML = "The customer was not added successfully!" + "<br>" + output.Exception;
 }
}

//Function for Section 3 - to change shipping address
function ChangeAddress()
{
 var newRequest = new XMLHttpRequest();
 var addressurl = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";

 var orderid = document.getElementById("orderid").value;
 var shipname = document.getElementById("shippingname").value;
 var shipaddress = document.getElementById("shippingaddress").value;
 var shipcity = document.getElementById("shippingcity").value;
 var shipcode = document.getElementById("shippingcode").value;

 var newaddress = '{"OrderID":"' + orderid + '","ShipName":"' + shipname +
 '","ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipPostCode":"' + shipcode + '"}';

 newRequest.onreadystatechange = function()
 {
 if (newRequest.readyState == 4 && newRequest.status == 200)
 {
 var addressresult = JSON.parse(newRequest.responseText);
 OperationOutput(addressresult);
 }
 }

 newRequest.open("POST", addressurl, true);
 newRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 newRequest.send(newaddress);

}
function OperationOutput(newupdate)
{
 if (newupdate == 1)
 {
 document.getElementById("orderupdateresult").innerHTML = "The address was updated successfully!"
 }
 else if (newupdate == 0)
 {
 document.getElementById("orderupdateresult").innerhtml = "The address failed with an unspecified error!"
 }
 else if (newupdate == -2)
 {
 document.getElementById("orderupdateresult").innerhtml = "The operation failed because the data string supplied could not be deserialized into the service object."
 }
 else
 {
 document.getElementById("orderupdateresult").innerHTML = "The operation failed because a record with the supplied order could not be found." + "<br>" + newupdate.Exception;
 }
}

//Function for Section 3 - to delete a customer
function DeleteCustomer()
{
 var objectRequest = new XMLHttpRequest();
 var webservice = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
 webservice += document.getElementById("customerid").value;
 
 objectRequest.onreadystatechange = function()
 {
 if (objectRequest.readyState == 4 && objectRequest.status == 200)
 {
 var secthreeresult = JSON.parse(objectRequest.responseText);
 DeleteClient(secthreeresult);
 }
 }

 objectRequest.open("GET", webservice, true);
 objectRequest.send();

}
function DeleteClient(result)
{
  delcust = result.DeleteCustomerResult.ClientID;  
    
 if (result.DeleteCustomerResult.WasSuccessful == 1)
 {
 document.getElementById("deleteresult").innerHTML = "The customer was deleted successfully!"
 }
 else
 {
 document.getElementById("deleteresult").innerHTML = "The customer was not deleted successfully!" + "<br>" + result.DeleteCustomerResult.Exception;
 }
}
