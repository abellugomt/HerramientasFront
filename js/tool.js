var selectedRow = null

const host = '129.158.60.253';
//const host = 'localhost';

//*******   *******    *******  *******/ 
//*******    CRUD  TOOL     *******/ 
//*******   *******    *******  *******/ 

function onToolSubmit(e) {
	event.preventDefault();
        const formData = readFormToolData();
        createTool(formData);
        resetFormTool();    
}

//Retrieve the data
function readFormToolData() {
    var formData = {};
    formData["id"] = document.getElementById("toolId").value;
    formData["name"] = document.getElementById("toolName").value;
    formData["brand"] = document.getElementById("toolBrand").value;
    formData["year"] = parseInt(document.getElementById("toolYear").value) ;
    formData["description"] = document.getElementById("toolDescription").value;
    formData["category"] = {"id": parseInt(document.getElementById("toolCategory").value)};
    return formData;
}

function createTool(data){
    const url = `http://${host}:8080/api/Tool/save`;

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
function loadToolData(){
    const table = document.getElementById("toolList").getElementsByTagName('tbody')[0];

    $.ajax({
        url : `http://${host}:8080/api/Tool/all`,
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
                    cell3.innerHTML = item.brand;
                cell4 = newRow.insertCell(3);
                    cell4.innerHTML = item.year;
                cell5 = newRow.insertCell(4);
                    cell5.innerHTML = item.description;
                cell6 = newRow.insertCell(5);
                    cell6.innerHTML = item.category.id;
                cell7 = newRow.insertCell(6);
                cell7.innerHTML = `<button onClick="toolSelect(this)">Select</button> <button onClick="toolDelete(this,${item.id})">Delete</button>`;   
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

loadToolData();
//Insert the data


//Edit the data
function toolSelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("toolId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("toolName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("toolBrand").value = selectedRow.cells[2].innerHTML;
    document.getElementById("toolYear").value = selectedRow.cells[3].innerHTML;
    document.getElementById("toolDescription").value = selectedRow.cells[4].innerHTML;
    document.getElementById("toolCategory").value = selectedRow.cells[5].innerHTML;
}
function toolUpdate() {
    const url = `http://${host}:8080/api/Tool/update`;
    const formData = readFormToolData();
    console.log('formData ->', formData)
    const data = {name: formData.name, brand: formData.brand, year: formData.year, description: formData.description, id: formData.id}
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
function toolDelete(td, id) {
    $.ajax({
        url : `http://${host}:8080/api/Tool/${id}`,
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
        document.getElementById('toolList').deleteRow(row.rowIndex);
        resetFormTool();
    }
}

//Reset the data
function resetFormTool() {
    document.getElementById("toolId").value = '';
    document.getElementById("toolName").value = '';
    document.getElementById("toolBrand").value = '';
    document.getElementById("toolYear").value = '';
    document.getElementById("toolDescription").value = '';
    document.getElementById("toolCategory").value = '';
    selectedRow = null;
}
