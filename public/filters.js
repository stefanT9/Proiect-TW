async function getResultsFromFilters(filters, columns, paginationOptions) {
    var body = {
        filters: filters,
        columns: columns
    }
    console.log(paginationOptions)
    if (paginationOptions !== undefined) {
        body.page = paginationOptions.page
        body.size = paginationOptions.size
    }
    openLoader()
    var response = await fetch(
        '/values/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    )
    closeLoader()
    //console.log(response)
    //if(!response.json().success){
    //    createPopup(response.json().message, "Error").showPopup()
    //}
    return response.json()
}

async function getGraphResults(xFieldName, yFieldName, paginationOptions) {
    var dataset = []
    var filteredResults = await getResultsFromFilters(JSON.parse(getFilters()), [xFieldName, yFieldName], paginationOptions)
    if(!filteredResults.success){
        createPopup(filteredResults.message, "Error").showPopup()
    }
    for (var i = 0; i < filteredResults.data.length; i++) {
        dataset.push({
            x: filteredResults.data[i][xFieldName],
            y: filteredResults.data[i][yFieldName]
        })
    }
    return dataset
}