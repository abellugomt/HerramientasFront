var selectedRow = null

const host = '129.158.60.253';
//const host = 'localhost';

//*******   *******    *******  *******/ 
//*******    CRUD  ORTOPEDIC     *******/ 
//*******   *******    *******  *******/ 

function onOrtopedicSubmit(e) {
	event.preventDefault();
        const formData = readFormOrtopedicData();
        createOrtopedic(formData);
        resetFormOrtopedic();    
}

//Retrieve the data
function readFormOrtopedicData() {
    var formData = {};
    formData["id"] = document.getElementById("ortopedicId").value;
    formData["name"] = document.getElementById("ortopedicName").value;
    formData["brand"] = document.getElementById("ortopedicBrand").value;
    formData["year"] = parseInt(document.getElementById("ortopedicYear").value) ;
    formData["description"] = document.getElementById("ortopedicDescription").value;
    formData["category"] = {"id": parseInt(document.getElementById("ortopedicCategory").value)};
    return formData;
}

function createOrtopedic(data){
    const url = `http://${host}:8080/api/Ortopedic/save`;

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
function loadOrtopedicData(){
    const table = document.getElementById("ortopedicList").getElementsByTagName('tbody')[0];

    $.ajax({
        url : `http://${host}:8080/api/Ortopedic/all`,
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
                cell7.innerHTML = `<button onClick="ortopedicSelect(this)">Select</button> <button onClick="ortopedicDelete(this,${item.id})">Delete</button>`;   
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

loadOrtopedicData();
//Insert the data


//Edit the data
function ortopedicSelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("ortopedicId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("ortopedicName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("ortopedicBrand").value = selectedRow.cells[2].innerHTML;
    document.getElementById("ortopedicYear").value = selectedRow.cells[3].innerHTML;
    document.getElementById("ortopedicDescription").value = selectedRow.cells[4].innerHTML;
    document.getElementById("ortopedicCategory").value = selectedRow.cells[5].innerHTML;
}
function ortopedicUpdate() {
    const url = `http://${host}:8080/api/Ortopedic/update`;
    const formData = readFormOrtopedicData();
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
function ortopedicDelete(td, id) {
    $.ajax({
        url : `http://${host}:8080/api/Ortopedic/${id}`,
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
        document.getElementById('ortopedicList').deleteRow(row.rowIndex);
        resetFormOrtopedic();
    }
}

//Reset the data
function resetFormOrtopedic() {
    document.getElementById("ortopedicId").value = '';
    document.getElementById("ortopedicName").value = '';
    document.getElementById("ortopedicBrand").value = '';
    document.getElementById("ortopedicYear").value = '';
    document.getElementById("ortopedicDescription").value = '';
    document.getElementById("ortopedicCategory").value = '';
    selectedRow = null;
}
