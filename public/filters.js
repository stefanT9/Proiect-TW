async function getResultsFromFilters(filters, columns, paginationOptions) {
    var body = {
        filters: filters,
        columns: columns
    }
    console.log(paginationOptions)
    if (paginationOptions !== undefined) {
        body["page"] = paginationOptions["page"]
        body["size"] = paginationOptions["size"]
    }
    var response = await fetch(
        "/filter/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );
    return response.json();
}

async function getGraphResults(xFieldName, yFieldName, paginationOptions) {
    var dataset = []
    var filteredResults = await getResultsFromFilters(JSON.parse(getFilters()), [xFieldName, yFieldName], paginationOptions)
    for (var i = 0; i < filteredResults["data"].length; i++) {
        dataset.push({
            x: filteredResults["data"][i][xFieldName],
            y: filteredResults["data"][i][yFieldName]
        })
    }
    return dataset
}

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
    var response = await fetch(
        '/filter/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    )
    return response.json()
}

async function getGraphResults(xFieldName, yFieldName, paginationOptions) {
    var dataset = []
    var filteredResults = await getResultsFromFilters(JSON.parse(getFilters()), [xFieldName, yFieldName], paginationOptions)
    for (var i = 0; i < filteredResults.data.length; i++) {
        dataset.push({
            x: filteredResults.data[i][xFieldName],
            y: filteredResults.data[i][yFieldName]
        })
    }
    return dataset
}