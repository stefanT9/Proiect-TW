let availableFields = []
let docsCsv = new Array()

function addTableColumn(name) {
    var newTableHeading = document.createElement('th')
    newTableHeading.classList.add('resultsTableHeadhing')
    newTableHeading.textContent = name
    document.getElementById('resultsTableHeadingRow').appendChild(newTableHeading)
}

function addTableRow(rowData) {
    var newRow = document.createElement('tr')
    newRow.classList.add('resultsTableRow')
    for (var i = 0; i < rowData.length; i++) {
        var newTd = document.createElement('td')
        newTd.classList.add('resultsTableData')
        newTd.textContent = rowData[i]
        newRow.appendChild(newTd)
    }
    document.getElementById('resultsTableBody').appendChild(newRow)
}

async function getAvailableFields() {
    const url = '/columns'
    openLoader()
    return await fetch(url)
        .then(data => {
            closeLoader()
            return data.json()
        })
        .then(res => {
            closeLoader()
            return res
        })
        .catch(err => {
            closeLoader()
            return undefined
        })
}

function loadFields() {
    console.log(availableFields)
    let parent = document.getElementsByClassName('fieldsWrapper')[0]
    const flipP = document.createElement('p')
    flipP.innerText = 'Choose columns'
    flipP.className = 'flip'
    parent.appendChild(flipP)
    const filters = document.createElement('div')
    filters.id = 'filtersDiv'
    filters.style.display = "none"
    parent.appendChild(filters)
    flipP.onclick = function () {
        if (document.getElementById(filters.id).style.display == 'none') { document.getElementById(filters.id).style.display = 'block' } else { document.getElementById(filters.id).style.display = 'none' }
    }
    for (const idx in availableFields) {
        const cb = document.createElement('input')
        cb.type = 'checkbox'
        cb.value = availableFields[idx]['name']
        cb.id = cb.value
        cb.name = cb.id

        const label = document.createElement('label')
        label.innerText = availableFields[idx]['name']
        label.className = 'container'
        label.appendChild(cb)

        const span = document.createElement('span')
        span.className = 'checkmark'
        label.appendChild(span)
        label.for = cb.name
        filters.appendChild(label)

        if (availableFields[idx]['type'] == 'dummy') {
            if (Math.random() < 0.5) {
                appendContinuousFilter(availableFields[idx].details, availableFields[idx]['name'], 0, 15, 0.1)
            } else {
                appendDiscreteFilter(availableFields[idx].details, availableFields[idx]['name'], ['lol', 'bol', 'tzol'])
            }
        } else if (availableFields[idx]['type'] == 'discrete') {
            appendDiscreteFilter(availableFields[idx].details, availableFields[idx]['name'], availableFields[idx]['values'])
        } else if (availableFields[idx]['type'] == 'continuous') {
            appendContinuousFilter(availableFields[idx].details, availableFields[idx]['name'], availableFields[idx]['min'], availableFields[idx]['max'], 0.01)
        } else if (availableFields[idx]['type'] == 'date') {
            appendContinuousFilter(availableFields[idx].details, availableFields[idx]['name'], availableFields[idx]['min'], availableFields[idx]['max'], 0.01, true)
        }
    }
}

function appendDiscreteFilter(question, columnName, options) {
    if (options.length == 0) { return }

    totalDiscrete = totalDiscrete + 1
    const flipP = document.createElement('p')
    flipP.innerText = question
    flipP.className = 'flip'
    flipP.id = 'pdivD' + String(totalDiscrete)
    document.getElementById('fieldsPopUpForm').appendChild(flipP)
    const discreteFilter = document.createElement('div')
    discreteFilter.id = 'divD' + String(totalDiscrete)
    flipP.onclick = function () {
        if (document.getElementById(discreteFilter.id).style.display == 'none') { document.getElementById(discreteFilter.id).style.display = 'block' } else { document.getElementById(discreteFilter.id).style.display = 'none' }
    }
    discreteFilter.style.display = 'none'
    discreteFilter.className = 'questionDivDiscrete'
    const questionText = document.createElement('p')
    questionText.id = 'QD' + String(totalDiscrete)
    questionText.innerText = question
    questionText.className = columnName
    questionText.style.display = 'none'

    discreteFilter.appendChild(questionText)

    const inputSearch = document.createElement('input')
    inputSearch.type = "text"
    inputSearch.id = "search" + String(totalDiscrete)
    const labelSearch = document.createElement('label')
    labelSearch.innerText = "Search value: "
    labelSearch.appendChild(inputSearch)
    const x = String(totalDiscrete)
    inputSearch.onchange = function () {
        let nxt = 1

        while (document.getElementById("cbD" + String(x) + "a" + String(nxt)) != null) {
            let textA = document.getElementById("cbD" + String(x) + "a" + String(nxt)).textContent.toLowerCase()
            let toSearch = document.getElementById("search" + String(x)).value.toLowerCase()
            if (textA.includes(toSearch) || toSearch.length == 0) {
                showAnswer(x, nxt)
            } else {
                hideAnswer(x, nxt)
            }

            nxt++
        }
    }
    discreteFilter.appendChild(labelSearch)

    for (let i = 0; i < options.length; i++) {
        const cb = document.createElement('input')

        cb.type = 'checkbox'
        cb.name = options[i] + '_' + String(totalDiscrete)
        cb.value = options[i]
        cb.id = cb.name

        const label = document.createElement('label')
        label.innerText = options[i]
        label.className = 'container'
        label.appendChild(cb)

        const span = document.createElement('span')
        span.className = 'checkmark'

        label.appendChild(span)

        label.for = cb.name
        label.id = "cbD" + String(totalDiscrete) + "a" + String(i + 1)

        discreteFilter.appendChild(label)
    }

    document.getElementById('fieldsPopUpForm').appendChild(discreteFilter)
}

function hideAnswer(q, a) {
    if (q > totalDiscrete || q < 1) {
        return;
    }

    if (document.getElementById("cbD" + String(q) + "a" + String(a)) == null) {
        return;
    }

    document.getElementById("cbD" + String(q) + "a" + String(a)).style.display = "none"
}

function showAnswer(q, a) {
    if (q > totalDiscrete || q < 1) {
        return;
    }

    if (document.getElementById("cbD" + String(q) + "a" + String(a)) == null) {
        return;
    }

    document.getElementById("cbD" + String(q) + "a" + String(a)).style.display = "block"
}

function appendContinuousFilter(question, columnName, min, max, step, isDate) {
    if (String(max) == 'null' || String(min) == 'null') { return }

    totalContinous = totalContinous + 1
    const flipP = document.createElement('p')
    flipP.id = 'pdivC' + String(totalContinous)
    flipP.innerText = question
    flipP.className = 'flip'
    document.getElementById('fieldsPopUpForm').appendChild(flipP)
    const continousFilter = document.createElement('div')
    continousFilter.id = 'divC' + String(totalContinous)
    flipP.onclick = function () {
        if (document.getElementById(continousFilter.id).style.display == 'none') { document.getElementById(continousFilter.id).style.display = 'block' } else { document.getElementById(continousFilter.id).style.display = 'none' }
    }
    continousFilter.style.display = 'none'
    continousFilter.className = 'questionDivContinuous'
    const questionText = document.createElement('p')
    questionText.id = 'QC' + String(totalContinous)
    questionText.innerText = question
    questionText.className = columnName
    questionText.style.display = 'none'

    continousFilter.appendChild(questionText)

    const range1 = document.createElement('input')
    range1.type = (isDate ? 'date' : 'range')
    range1.min = min
    range1.max = max
    if (!isDate) {
        range1.step = step
        range1.className = 'slider'
    }

    range1.value = min
    range1.name = 'Min_' + String(totalContinous)
    range1.id = 'Min_' + String(totalContinous)

    const range2 = document.createElement('input')
    range2.type = (isDate ? 'date' : 'range')
    range2.min = min
    range2.max = max
    if (!isDate) {
        range2.step = step
        range2.className = 'slider'
    }
    range2.value = max
    range2.name = 'Max_' + String(totalContinous)
    range2.id = 'Max_' + String(totalContinous)

    const label1 = document.createElement('label')
    label1.id = 'LMin_' + String(totalContinous)
    label1.innerText = (isDate ? 'From: ' : String(min))

    if (isDate) {
        continousFilter.appendChild(label1)
        continousFilter.appendChild(range1)
    } else {
        continousFilter.appendChild(range1)
        continousFilter.appendChild(label1)
    }

    const spacer = document.createElement('div')

    continousFilter.appendChild(spacer)

    const label2 = document.createElement('label')
    label2.id = 'LMax_' + String(totalContinous)
    label2.innerText = (isDate ? 'To: ' : String(max))

    if (isDate) {
        continousFilter.appendChild(label2)
        continousFilter.appendChild(range2)
    } else {
        continousFilter.appendChild(range2)
        continousFilter.appendChild(label2)
    }

    if (!isDate) {
        range1.oninput = function () {
            const str = this.id
            const value = document.getElementById(str).value
            document.getElementById('L' + str).innerText = value
        }

        range2.oninput = function () {
            const str = this.id
            const value = document.getElementById(str).value
            document.getElementById('L' + str).innerText = value
        }
    }

    document.getElementById('fieldsPopUpForm').appendChild(continousFilter)
}

function getFilters() {
    const discreteQuestions = document.querySelectorAll('.questionDivDiscrete > label > input')
    const continousQuestions = document.querySelectorAll('.questionDivContinuous > input')
    const countContinuous = document.querySelectorAll('.questionDivContinuous').length
    const countDiscrete = document.querySelectorAll('.questionDivDiscrete').length

    const answersDiscrete = new Array()

    for (let i = 0; i < countDiscrete; i++) {
        answersDiscrete.push(new Array())
    }

    for (let i = 0; i < discreteQuestions.length; i++) {
        if (discreteQuestions[i].checked == true) {
            for (let j = 0; j < discreteQuestions[i].id.length; j++) {
                if (discreteQuestions[i].id[j] == '_') {
                    const value = discreteQuestions[i].id.substring(0, j)
                    const questionNumber = discreteQuestions[i].id.substring(j + 1)
                    answersDiscrete[questionNumber - 1].push(value)

                    //               console.log("Value " + String(value) + " for question " + String(questionNumber))
                }
            }
        }
    }

    // console.log("Final Discrete");
    // console.log(answersDiscrete)

    const answersContinous = new Array()

    for (let i = 0; i < continousQuestions.length; i += 2) {
        let value1 = parseFloat(continousQuestions[i].value)
        let value2 = parseFloat(continousQuestions[i + 1].value)

        if (isNaN(value1) || isNaN(value2) || continousQuestions[i].type == 'date') {
            value1 = continousQuestions[i].value
            value2 = continousQuestions[i + 1].value
        } else {
            if (continousQuestions[i].type == 'date') {
                value1 = new Date(continousQuestions[i].value)
                value2 = new Date(continousQuestions[i + 1].value)
            }
        }

        if (value1 > value2) {
            const temp = value1
            value1 = value2
            value2 = temp
        }

        // let questionNumber = i / 2 + 1;

        // console.log("Question Continous " + String(questionNumber));
        // console.log("Interval: " + String(value1) + " - " + String(value2));

        answersContinous.push([value1, value2])
    }

    let query = '{'
    let flag = false
    for (let i = 0; i < countDiscrete; i++) {
        if (answersDiscrete[i].length > 0) {
            if (flag == true) {
                query += ', '
            }

            flag = true
            let textQ = document.getElementById('QD' + String(i + 1)).classList
            textQ = '"' + textQ[textQ.length - 1] + '"'
            query += ' ' + textQ + ' : {'
            query += ' "$in": [ '
            for (let j = 0; j < answersDiscrete[i].length; j++) {
                query += '"'
                query += answersDiscrete[i][j]
                query += '"'

                if (j < answersDiscrete[i].length - 1) {
                    query += ', '
                }
            }

            query += '] }'
        }
    }

    for (let i = 0; i < countContinuous; i++) {
        if (answersContinous[i][0] - parseFloat(continousQuestions[2 * i].step) < parseFloat(continousQuestions[2 * i].min) &&
            answersContinous[i][1] + parseFloat(continousQuestions[2 * i].step) > parseFloat(continousQuestions[2 * i].max)) {
            continue
        }

        if (flag == true) {
            query += ', '
        }

        flag = true
        let textQ = document.getElementById('QC' + String(i + 1)).classList
        textQ = '"' + textQ[textQ.length - 1] + '"'
        query += ' ' + textQ + ' : {'
        query += '"$gte": '
        query += answersContinous[i][0]
        query += ', '
        query += '"$lte": '
        query += answersContinous[i][1]
        query += ' } '
    }

    query += ' }'

    return query
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
    if(!response.json().success){
        createPopup(response.json().message, "Error").showPopup()
    }
    return response.json()
}

function hideFilter(idxFilter, typeOfFilter) {
    if (idxFilter < 1) {
        return;
    }

    if (typeOfFilter == 'C') {
        if (idxFilter > totalContinous) {
            return;
        }
    } else {
        if (idxFilter > totalDiscrete) {
            return;
        }
    }

    let divId = 'div' + typeOfFilter + String(idxFilter)
    let pId = 'p' + divId

    document.getElementById(divId).style.display = "none"
    document.getElementById(pId).style.display = "none"
}

function showFilter(idxFilter, typeOfFilter) {
    if (idxFilter < 1) {
        return;
    }

    if (typeOfFilter == 'C') {
        if (idxFilter > totalContinous) {
            return;
        }
    } else {
        if (idxFilter > totalDiscrete) {
            return;
        }
    }

    let divId = 'div' + typeOfFilter + String(idxFilter)
    let pId = 'p' + divId

    document.getElementById(divId).style.display = "none"
    document.getElementById(pId).style.display = "block"
}

function onChangeSearchFilters() {
    let toSearch = document.getElementById('searchFilters').value.toLowerCase()

    for (let i = 1; i <= totalContinous; i++) {
        let textQ = document.getElementById('pdivC' + String(i)).textContent.toLowerCase()

        if (textQ.includes(toSearch) || toSearch.length == 0) {
            showFilter(i, 'C')
        } else {
            hideFilter(i, 'C')
        }
    }

    for (let i = 1; i <= totalDiscrete; i++) {
        let textQ = document.getElementById('pdivD' + String(i)).textContent.toLowerCase()

        if (textQ.includes(toSearch) || toSearch.length == 0) {
            showFilter(i, 'D')
        } else {
            hideFilter(i, 'D')
        }
    }
}

async function addTable() {
    docsCsv = new Array()
    let newTBody = document.createElement('tbody')
    newTBody.id = "resultsTableBody"
    let oldTBody = document.getElementById('resultsTableBody')
    oldTBody.parentElement.replaceChild(newTBody, oldTBody)

    let newTh = document.createElement('tr')
    newTh.id = "resultsTableHeadingRow"
    let oldTh = document.getElementById('resultsTableHeadingRow')
    oldTh.parentElement.replaceChild(newTh, oldTh)

    closePopUp()
    let columnsCb = document.querySelectorAll('#filtersDiv > label > input')
    let columns = []
    let cntCol = 0
    columns[cntCol] = "Nr. "
    cntCol++
    addTableColumn("Nr. ")
    for (let i = 0; i < columnsCb.length; i++) {
        if (columnsCb[i].checked == true) {
            columns[cntCol] = String(columnsCb[i].id)
            cntCol++
            addTableColumn(String(columnsCb[i].id))
        }
    }

    docsCsv.push(columns)

    let query = JSON.parse(getFilters())

    let results = await getResultsFromFilters(query, columns)
    for (let i = 0; i < results["data"].length; i++) {
        let dataset = []
        let cnt = 0
        for (let j = 0; j < columns.length; j++) {
            if (j == 0) {
                dataset[cnt] = String(i + 1)
            } else {
                dataset[cnt] = results["data"][i][columns[j]]
            }

            cnt++
        }

        addTableRow(dataset)
        docsCsv.push(dataset)
    }

    console.log('For csv:')
    console.log(docsCsv)
}

function openPopUp() {
    document.getElementById('invisibleBackground').classList.add('grayout')
    document.getElementById('fieldsPopUpForm').classList.add('visible')
    document.body.style.overflow = 'hidden'
    document.getElementById('confirmFieldsSelectionButton').classList.remove('no-click')
    document.getElementById('resultsTableDiv').style.zIndex = -9999
}
function openLoginPopUp() {
    document.getElementById('invisibleBackground').classList.add('grayout')
    document.getElementById('loginPopUpForm').classList.add('visible')
    document.body.style.overflow = 'hidden'
    document.getElementById('confirmFieldsSelectionButton').classList.remove('no-click')
    document.getElementById('confirmFieldsSelectionButton').classList.remove('no-click')
    document.getElementById('resultsTableDiv').style.zIndex = -9999
}

function closeLoginPopUp() {
    document.getElementById('resultsTableDiv').style.zIndex = 0
    document.getElementById('invisibleBackground').classList.remove('grayout')
    document.getElementById('loginPopUpForm').classList.remove('visible')
    document.body.style.overflow = ''
    document.getElementById('confirmFieldsSelectionButton').classList.add('no-click')
    document.getElementById('confirmFieldsSelectionButton').classList.add('no-click')
}

function closePopUp() {
    document.getElementById('resultsTableDiv').style.zIndex = 0
    document.getElementById('invisibleBackground').classList.remove('grayout')
    document.getElementById('fieldsPopUpForm').classList.remove('visible')
    document.body.style.overflow = ''
    document.getElementById('confirmFieldsSelectionButton').classList.add('no-click')
}
async function submitLoginForm() {

    const email = document.getElementById('usernameField').value
    const password = document.getElementById('passwordField').value

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success === true) {
                document.cookie = `token=${data.token}`;
                closeLoginPopUp()
            }
            else {
                //alert(data.message)
                createPopup(data.message, "Login error").showPopup()
            }
        })
        .catch(err => {
            console.log(err)
        })

}
function exportCsv() {
    if (docsCsv.length == 0) {
        alert("You have to generate a table first")
    } else {
        var csvContent = "data:text/csv;charset=utf-8,";

        docsCsv.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getAvailableFields()
        .then(res => { availableFields = res.columns })
        .then(columns => { loadFields() })
        .catch(e => { console.log(e) })
}, false)

var totalDiscrete = 0
var totalContinous = 0