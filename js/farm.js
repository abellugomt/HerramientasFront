var selectedRow = null

const host = '129.158.60.253';
//const host = 'localhost';

//*******   *******    *******  *******/ 
//*******    CRUD  FARM     *******/ 
//*******   *******    *******  *******/ 

function onFarmSubmit(e) {
	event.preventDefault();
        const formData = readFormFarmData();
        createFarm(formData);
        resetFormFarm();    
}

//Retrieve the data
function readFormFarmData() {
    var formData = {};
    formData["id"] = document.getElementById("farmId").value;
    formData["name"] = document.getElementById("farmName").value;
    formData["address"] = document.getElementById("farmAddress").value;
    formData["extension"] = parseInt(document.getElementById("farmExtension").value);
    formData["category"] = {
        "id": parseInt(document.getElementById("farmCategoryId").value)
    },
    formData["description"] = document.getElementById("farmDescription").value;
    return formData;
}

function createFarm(data){
    const url = `http://${host}:8080/api/Farm/save`;

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
function loadFarmData(){
    const table = document.getElementById("farmList").getElementsByTagName('tbody')[0];

    $.ajax({
        url : `http://${host}:8080/api/Farm/all`,
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
                    cell1.innerHTML = item.id;
                cell2 = newRow.insertCell(1);
                    cell2.innerHTML = item.name;
                cell3 = newRow.insertCell(2);
                    cell3.innerHTML = item.address;
                cell4 = newRow.insertCell(3);
                    cell4.innerHTML = item.extension;
                cell5 = newRow.insertCell(4);
                    cell5.innerHTML = item.description;
                cell6 = newRow.insertCell(5);
                    cell6.innerHTML = item.category.id;
                cell7 = newRow.insertCell(6);
                cell7.innerHTML = `<button onClick="farmSelect(this)">Select</button> <button onClick="farmDelete(this,${item.id})">Delete</button>`;
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

loadFarmData();
//Insert the data


//Edit the data
function farmSelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("farmId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("farmName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("farmAddress").value = selectedRow.cells[2].innerHTML;
    document.getElementById("farmExtension").value = selectedRow.cells[3].innerHTML;
    document.getElementById("farmDescription").value = selectedRow.cells[4].innerHTML;
    document.getElementById("farmCategoryId").value = selectedRow.cells[5].innerHTML;
}
function farmUpdate() {
    const url = `http://${host}:8080/api/Farm/update`;
    const formData = readFormFarmData();
    console.log('formData ->', formData)
    const data = {
        name: formData.name, 
        address: formData.address,
        extension: formData.extension,
        description: formData.description, 
        id: formData.id}
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
function farmDelete(td, id) {
    $.ajax({
        url : `http://${host}:8080/api/Farm/${id}`,
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
        document.getElementById('farmList').deleteRow(row.rowIndex);
        resetFormFarm();
    }
}

//Reset the data
function resetFormFarm() {
    document.getElementById("farmId").value = '';
    document.getElementById("farmName").value = '';
    document.getElementById("farmDescription").value = '';
    selectedRow = null;
}
