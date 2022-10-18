var selectedRow = null

const host = '129.158.60.253';
//const host = 'localhost';

//*******   *******    *******  *******/ 
//*******    CRUD  MESSAGE     *******/ 
//*******   *******    *******  *******/ 

function onMessageSubmit(e) {
	event.preventDefault();
        const formData = readFormMessageData();
        createMessage(formData);
        resetFormMessage();    
}

//Retrieve the data
function readFormMessageData() {
    var formData = {};
    formData["id"] = parseInt(document.getElementById("messageId").value);
    formData["messageText"] = document.getElementById("messageText").value;
    formData["client"] = {"idClient": parseInt(document.getElementById("messageClientId").value)};
    formData["ortopedic"] = {"id": parseInt(document.getElementById("messageOrtopedicId").value)};
    return formData;
}

function createMessage(data){
    const url = `http://${host}:8080/api/Message/save`;

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
            // location.reload();
        }
    })
}
//Load data
function loadMessageData(){
    const table = document.getElementById("messageList").getElementsByTagName('tbody')[0];

    $.ajax({
        url : `http://${host}:8080/api/Message/all`,
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
                    cell1.innerHTML = item.idMessage;
                cell2 = newRow.insertCell(1);
                    cell2.innerHTML = item.messageText;
                cell3 = newRow.insertCell(2);
                    cell3.innerHTML = item.client.idClient;
                cell4 = newRow.insertCell(3);
                    cell4.innerHTML = item.ortopedic.id;
                cell5 = newRow.insertCell(4);
                cell5.innerHTML = `<button onClick="messageSelect(this)">Select</button> <button onClick="messageDelete(this,${item.idMessage})">Delete</button>`;
                    
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

loadMessageData();
//Insert the data


//Edit the data
function messageSelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("messageId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("messageText").value = selectedRow.cells[1].innerHTML;
    document.getElementById("messageClientId").value = selectedRow.cells[2].innerHTML;
    document.getElementById("messageOrtopedicId").value = selectedRow.cells[3].innerHTML;
}
function messageUpdate() {
    const url = `http://${host}:8080/api/Message/update`;
    const formData = readFormMessageData();
    console.log('formData ->', formData)
    const data = {
        messageText: formData.messageText,
        idMessage: formData.id
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
            // location.reload();
        }
    })
}

//Delete the data
function messageDelete(td, id) {
    $.ajax({
        url : `http://${host}:8080/api/Message/${id}`,
        data : null,
        type : "DELETE", //POST, PUT, DELETE,
        dataType : 'json',
        headers: {  
            'Access-Control-Allow-Origin': true
        },
        success: function(data) {
            console.log('Eliminado -->', data);
            // location.reload();
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
        document.getElementById('messageList').deleteRow(row.rowIndex);
        resetFormMessage();
    }
}

//Reset the data
function resetFormMessage() {
    document.getElementById("messageId").value = '';
    document.getElementById("messageText").value = '';
    document.getElementById("messageClientId").value = '';
    document.getElementById("messageOrtopedicId").value = '';
    selectedRow = null;
}
