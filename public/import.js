function importColumn(name, details, type, onSuccess, onError, translate = undefined) {
    var column = {
        name: name,
        details: details,
        type: type
    }
    if (translate !== undefined) {
        column.translate = translate
    }
    openLoader()
    let authToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))
    .split('=')[1]
    if(authToken)
    {
        fetch(
            '/columns/administrative/columns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, 
                },
                keepalive: false,
                body: JSON.stringify(column)
            }
        ).then(function(response) {
            closeLoader()
            if (!response.ok) {
                onError(response.json())
            } else {
                onSuccess(response.json())
            }
        })
    }
    else{
        alert('you need to be logged in to do this')
        openLoginPopUp()
    }
}

async function importValue(valueObj, onSuccess, onError) {
    let authToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))
    .split('=')[1]

    console.log('bagamisa pula')
    
    await fetch(
        '/values/administrative/values', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, 
            },
            keepalive: false,
            body: JSON.stringify(valueObj)
        }
    ).then(function(response) {
        if (!response.ok) {
            onError(response.json())
        } else {
            onSuccess(response.json())
        }
    })
}

function parseCSVRow(csvROW) {
    var parts = csvROW.split(',')
    var result = []
    for (var i = 0; i < parts.length; i++) {
        var value = parts[i].trim()
        if (value.length === 0) {
            value = ''
        } else if (value[0] === '"' || value[0] === "'") {
            value = value.substring(1, value.length - 1)
        } else {
            value = parseFloat(value)
        }
        result.push(value)
    }
    return result
}

async function importCSVValue(csvContents) {
    var csvLines = csvContents.split('\n')
    var header = parseCSVRow(csvLines[0])
    var valueObj = {}
    var popup = createPopup("Imported 0 out of "+csvLines.length+" lines", "Importing Data")
    var totalImported = 0
    popup.showPopup()
    for (var i = 1; i < csvLines.length; i++) {
        var lineValues = parseCSVRow(csvLines[i])
        for (var j = 0; j < header.length; j++) {
            valueObj[header[j]] = lineValues[j]
        }
        await importValue(valueObj, (response)=>{
            totalImported++
            popup.setPopupText("Imported "+totalImported+" out of "+csvLines.length+" lines")
            console.log(response.message)
        }, (response)=>{
            console.log(response.message)
        })
    }
}

async function fileLoadHandler(event) {
    var result = event.target.result
    await importCSVValue(result)
}

async function readFile(event) {
    reader = new FileReader()
    reader.addEventListener('load', fileLoadHandler)
    reader.readAsText(event.target.files[0])
}

function importFile() {
    if(document.cookie.split('; ').filter(cookie=>cookie.search("token=") != -1).length === 0){
        openLoginPopUp()
    }else{
        if(document.cookie.split('; ').filter(cookie=>cookie.search("token=") != -1)[0].split("=")[1].length === 0){
            openLoginPopUp()
        }else{
            document.getElementById('readFileId').click()
        }
    }
}