function addTableColumn(name){
	var newTableHeading = document.createElement('th');
	newTableHeading.classList.add("resultsTableHeadhing");
	newTableHeading.textContent = name;
	document.getElementById('resultsTableHeadingRow').appendChild(newTableHeading);
}

function addTableRow(rowData){
	var newRow = document.createElement('tr');
	newRow.classList.add("resultsTableRow");
	for(var i = 0; i<rowData.length; i++){
		var newTd = document.createElement('td');
		newTd.classList.add("resultsTableData");
		newTd.textContent = rowData[i];
		newRow.appendChild(newTd);
	}
	document.getElementById('resultsTableBody').appendChild(newRow);
}