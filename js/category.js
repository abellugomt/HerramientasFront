var selectedRow = null

const host = '129.158.60.253';
//const host = 'localhost';

//*******   *******    *******  *******/ 
//*******    CRUD  CATEGORY     *******/ 
//*******   *******    *******  *******/ 

function onCategorySubmit(e) {
	event.preventDefault();
        const formData = readFormCategoryData();
        createCategory(formData);
        resetFormCategory();    
}

//Retrieve the data
function readFormCategoryData() {
    var formData = {};
    formData["id"] = document.getElementById("categoryId").value;
    formData["name"] = document.getElementById("categoryName").value;
    formData["description"] = document.getElementById("categoryDescription").value;
    return formData;
}

function createCategory(data){
    const url = `http://${host}:8080/api/Category/save`;

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
function loadCategoryData(){
    const table = document.getElementById("categoryList").getElementsByTagName('tbody')[0];

    $.ajax({
        url : `http://${host}:8080/api/Category/all`,
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
                    cell3.innerHTML = item.description;
                cell4 = newRow.insertCell(3);
                cell4.innerHTML = `<button onClick="categorySelect(this)">Select</button> <button onClick="categoryDelete(this,${item.id})">Delete</button>`;
                    
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

loadCategoryData();
//Insert the data


//Edit the data
function categorySelect(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("categoryId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("categoryName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("categoryDescription").value = selectedRow.cells[2].innerHTML;
}
function categoryUpdate() {
    const url = `http://${host}:8080/api/Category/update`;
    const formData = readFormCategoryData();
    console.log('formData ->', formData)
    const data = {name: formData.name, description: formData.description, id: formData.id}
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
function categoryDelete(td, id) {
    $.ajax({
        url : `http://${host}:8080/api/Category/${id}`,
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
        document.getElementById('categoryList').deleteRow(row.rowIndex);
        resetFormCategory();
    }
}

//Reset the data
function resetFormCategory() {
    document.getElementById("categoryId").value = '';
    document.getElementById("categoryName").value = '';
    document.getElementById("categoryDescription").value = '';
    selectedRow = null;
}
