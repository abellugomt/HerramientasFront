var selectedRow = null

const host = '129.158.60.253';
//const host = 'localhost';

//*******   *******    *******  *******/ 
//*******    CRUD  CLIENT     *******/ 
//*******   *******    *******  *******/ 

function onClientSubmit(e) {
	event.preventDefault();
        const formData = readFormClientData();
        createClient(formData);
        resetFormClient();    
}

//Retrieve the data
function readFormClientData() {
    var formData = {};
    formData["idClient"] = document.getElementById("clientId").value;
    formData["name"] = document.getElementById("clientName").value;
    formData["email"] = document.getElementById("clientEmail").value;
    formData["age"] = document.getElementById("clientAge").value;
    formData["password"] = document.getElementById("clientPassword").value;
    return formData;
}

function createClient(data){
    const url = `http://${host}:8080/api/Client/save`;

    $.ajax({
        url : url,
        data : JSON.stringify(data),
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true 
        },
        type : "POST", //POST, PUT, DELETE
        dataType : 'json',
        success: function() {
            console.log('insertOK');
        },
        error: function(error) {
            console.log('errorInsert -->', error);
        },
        complete : function(xhr, status) {
            location.reload();
        }
    })
}
//Load data
function loadClientData(){
    const table = document.getElementById("clientList").getElementsByTagName('tbody')[0];

    $.ajax({
        url : `http://${host}:8080/api/Client/all`,
        data : null,
        headers: {  
            'Access-Control-Allow-Origin': true
        },
        type : "GET", //POST, PUT, DELETE, GET
        dataType : 'json',
        success: function(data) {
            console.log('data -->', data)
            data.map(item => {
                const newRow = table.insertRow();
                cell1 = newRow.insertCell(0);
                    cell1.innerHTML = item.idClient;
                cell2 = newRow.insertCell(1);
                    cell2.innerHTML = item.name;
                cell3 = newRow.insertCell(2);
                    cell3.innerHTML = item.email;
                cell4 = newRow.insertCell(3);
                    cell4.innerHTML = item.age;
                cell5 = newRow.insertCell(4);
                    cell5.innerHTML = item.password;


                cell6 = newRow.insertCell(5);
                    cell6.innerHTML = `<button onClick="clientSelect(this)">Select</button> <button onClick="clientDelete(this,${item.idClient})">Delete</button>`;
                    
            })
        },
        error: function(error) {
            alert('Error');
            console.log('errorLoad -->', error);
        },
        complete : function(xhr, status) {
            console.log('load OK');
        }
    }) 
}

loadClientData();
//Insert the data


//Edit the data
function clientSelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("clientId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("clientName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("clientEmail").value = selectedRow.cells[2].innerHTML;
    document.getElementById("clientAge").value = selectedRow.cells[3].innerHTML;
    document.getElementById("clientPassword").value = selectedRow.cells[4].innerHTML;

}
function clientUpdate() {
    const url = `http://${host}:8080/api/Client/update`;
    const formData = readFormClientData();
    console.log('formData ->', formData)
    const data = {
        name: formData.name, 
        email: formData.email, 
        age: formData.age, 
        password: formData.password,  
        idClient: formData.idClient
    }
    $.ajax({
        url : url,
        data : JSON.stringify(data),
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true 
        },
        type : "PUT", //POST, PUT, DELETE
        dataType : 'json',
        success: function() {
            console.log('updateOK');
        },
        error: function(error) {
            console.log('errorInsert -->', error);
        },
        complete : function(xhr, status) {
            location.reload();
        }
    })
}

//Delete the data
function clientDelete(td, id) {
    $.ajax({
        url : `http://${host}:8080/api/Client/${id}`,
        data : null,
        type : "DELETE", //POST, PUT, DELETE,
        dataType : 'json',
        headers: {  
            'Access-Control-Allow-Origin': true
        },
        success: function(data) {
            console.log('Eliminado -->', data);
            location.reload();
        },
        error: function(error) {
            alert('Error');
            console.log('errorDelete -->', error);
        },
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    })
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('clientList').deleteRow(row.rowIndex);
        resetFormClient();
    }
}

//Reset the data
function resetFormClient() {
    document.getElementById("clientId").value = '';
    document.getElementById("clientName").value = '';
    document.getElementById("clientEmail").value = '';
    document.getElementById("clientAge").value = '';
    document.getElementById("clientPassword").value = '';
    selectedRow = null;
}
