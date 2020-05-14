function importColumn(name, details, type, onSuccess, onError, translate = undefined) {
	var column = {
		name:name,
		details:details,
		type:type
	};
	if(translate !== undefined){
		column["translate"] = translate;
	}
	fetch(
		"/insert/column",
		{
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(column)
		}
	).then(function(response){
		if(!response.ok){
			onError(response.json());
		}else{
			onSuccess(response.json());
		}
	});
}

async function importValue(valueObj, onSuccess, onError) {
	await fetch(
		"/insert/value",
		{
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(valueObj)
		}
	).then(function(response){
		if(!response.ok){
			onError(response.json());
		}else{
			onSuccess(response.json());
		}
	});
}

function parseCSVRow(csvROW){
	var parts = csvROW.split(",");
	var result = [];
	for(var i = 0; i<parts.length; i++){
		var value = parts[i].trim();
		if(value.length === 0){
			value = "";
		}else if(value[0] === '"' || value[0] === "'"){
			value = value.substring(1, value.length-1);

		}else{
			value = parseFloat(value);
		}
		result.push(value);
	}
	return result;
}

async function importCSVValue(csvContents){
	var csvLines = csvContents.split("\n");
	var header = parseCSVRow(csvLines[0]);
	var valueObj = {};
	for(var i = 1; i<csvLines.length; i++){
		var lineValues = parseCSVRow(csvLines[i]);
		for(var j = 0; j<header.length; j++){
			valueObj[header[j]] = lineValues[j];
		}
		await importValue(valueObj, function(response){
			console.log(response["message"]);
		}, function(response){
			console.log(response["message"]);
		});
	}
}

async function fileLoadHandler(event){
	var result = event.target.result;
   	await importCSVValue(result);
}

async function readFile(event) {
	reader = new FileReader();
    reader.addEventListener('load', fileLoadHandler);
	reader.readAsText(event.target.files[0]);
}