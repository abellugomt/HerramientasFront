var selectedRow = null

const host = '129.158.60.253';
//const host = 'localhost';

//*******   *******    *******  *******/ 
//*******    CRUD  RESERVATION     *******/ 
//*******   *******    *******  *******/ 

function onReservationSubmit(e) {
	event.preventDefault();
        const formData = readFormReservationData();
        createReservation(formData);
        resetFormReservation();    
}

//Retrieve the data
function readFormReservationData() {
    var formData = {};
    formData["id"] = document.getElementById("reservationId").value;
    formData["startDate"] = document.getElementById("reservationStartDate").value;
    formData["devolutionDate"] = document.getElementById("reservationDevolutionDate").value;
    formData["client"] = {"idClient": parseInt(document.getElementById("reservationClientId").value)};
    formData["ortopedic"] = {"id": parseInt(document.getElementById("reservationOrtopedicId").value)};
    return formData;
}

function createReservation(data){
    const url = `http://${host}:8080/api/Reservation/save`;

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
function loadReservationData(){
    const table = document.getElementById("reservationList").getElementsByTagName('tbody')[0];

    $.ajax({
        url : `http://${host}:8080/api/Reservation/all`,
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
                    cell1.innerHTML = item.idReservation;
                cell2 = newRow.insertCell(1);
                    cell2.innerHTML = item.startDate;
                cell3 = newRow.insertCell(2);
                    cell3.innerHTML = item.startDate;
                cell4 = newRow.insertCell(3);
                    cell4.innerHTML = item.client.idClient;
                cell5 = newRow.insertCell(4);
                    cell5.innerHTML = item.ortopedic.id;
                cell6 = newRow.insertCell(5);
                cell6.innerHTML = `<button onClick="reservationSelect(this)">Select</button> <button onClick="reservationDelete(this,${item.idReservation})">Delete</button>`;
                 
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

loadReservationData();
//Insert the data


//Edit the data
function reservationSelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("reservationId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("reservationStartDate").value = selectedRow.cells[1].innerHTML;
    document.getElementById("reservationDevolutionDate").value = selectedRow.cells[2].innerHTML;
    document.getElementById("reservationClientId").value = selectedRow.cells[3].innerHTML;
    document.getElementById("reservationOrtopedicId").value = selectedRow.cells[4].innerHTML;
}
function reservationUpdate() {
    const url = `http://${host}:8080/api/Reservation/update`;
    const formData = readFormReservationData();
    console.log('formData ->', formData)
    const data = {startDate: formData.startDate, devolutionDate: formData.devolutionDate, id: formData.id}
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
function reservationDelete(td, id) {
    $.ajax({
        url : `http://${host}:8080/api/Reservation/${id}`,
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
        document.getElementById('reservationList').deleteRow(row.rowIndex);
        resetFormReservation();
    }
}

//Reset the data
function resetFormReservation() {
    document.getElementById("reservationId").value = '';
    document.getElementById("reservationName").value = '';
    document.getElementById("reservationDescription").value = '';
    selectedRow = null;
}
