const dataObj = new Array()
let position = undefined
let totalGraphs = 0
let availableFields = []
const chartsPallete = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600']

const lineGraphElement = document.createElement('option')
lineGraphElement.value = 'line'
lineGraphElement.text = 'line graph'

const barGraphElement = document.createElement('option')
barGraphElement.value = 'bar'
barGraphElement.text = 'bar graph'

const radarGraphElement = document.createElement('option')
radarGraphElement.value = 'radar'
radarGraphElement.text = 'radar graph'

const doughnutGraphElement = document.createElement('option')
doughnutGraphElement.value = 'doughnut'
doughnutGraphElement.text = 'doughnut graph'

const pieGraphElement = document.createElement('option')
pieGraphElement.value = 'pie'
pieGraphElement.text = 'pie graph'

const polarGraphElement = document.createElement('option')
polarGraphElement.value = 'polar'
polarGraphElement.text = 'polar graph'

const scatterGraphElement = document.createElement('option')
scatterGraphElement.value = 'scatter'
scatterGraphElement.text = 'scatter graph'

const allOptions = [lineGraphElement, barGraphElement, radarGraphElement, pieGraphElement, doughnutGraphElement, scatterGraphElement]
const ddOptions = [lineGraphElement, barGraphElement, radarGraphElement, pieGraphElement, doughnutGraphElement] //[scatterGraphElement, lineGraphElement]
const dcOptions = [barGraphElement, radarGraphElement, pieGraphElement, doughnutGraphElement]
const cdOptions = []
const ccOptions = [lineGraphElement, barGraphElement, radarGraphElement, pieGraphElement, doughnutGraphElement]

var paginationEnabled = false

function labelCount(dataset) {
    var labelCountMapping = {}
    for (i in dataset) {
        var point = dataset[i]
        if (point.x + ' ' + point.y in labelCountMapping) {
            labelCountMapping[point.x + ' ' + point.y]++
        } else {
            labelCountMapping[point.x + ' ' + point.y] = 1
        }
    }
    return labelCountMapping
}

function mapDiscreteDiscrete(filterValues) {
    var labelCountMapping = labelCount(filterValues)
    console.log(labelCountMapping)
    var graphValues = []
    for (var label in labelCountMapping) {
        graphValues.push({
            x: label,
            y: labelCountMapping[label]
        })
    }
    return graphValues
}

function identityMapping(filterValues) {
    return filterValues
}

var mapFilterValues = {
    discrete: {
        discrete: mapDiscreteDiscrete,
        continuous: identityMapping
    },
    continuous: {
        discrete: identityMapping,
        continuous: identityMapping
    }
}

function buildLineGraph(context2D, dataset, label) {
    console.log(dataset)
    var labels = []
    var values
    for (i in dataset) {
        labels.push(dataset[i].x)
    }
    new Chart(context2D, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataObj[position - 1]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'x on y using line chart representation',
                fontColor: '#333'
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: 'test123'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    })
}

function buildScatterGraph(context2D, dataset, label) {
    console.log(dataset)
    new Chart(context2D, {
        type: 'scatter',
        data: {
            datasets: dataObj[position - 1]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'x on y using line chart representation',
                fontColor: '#333'
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: 'test123'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    })
}

function buildBarGraph(context2D, dataset, label) {
    console.log(dataset)
    var labels = []
    for (i in dataset) {
        labels.push(dataset[i].x)
    }
    new Chart(context2D, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: dataObj[position - 1]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'x on y using bar chart representation',
                fontColor: '#333'
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: 'test123'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    })
}

function buildRadarGraph(context2D, dataset, label) {
    console.log(dataset)
    var labels = []
    var values = []
    for (i in dataset) {
        labels.push(dataset[i].x)
        values.push(dataset[i].y)
    }
    new Chart(context2D, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: dataObj[position - 1]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'x on y using radar chart representation',
                fontColor: '#333'
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: 'test123'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    })
}

function buildDoughnutGraph(context2D, dataset, label) {
    console.log(dataset)
    var labels = []
    var values = []
    for (i in dataset) {
        labels.push(dataset[i].x)
        values.push(dataset[i].y)
    }
    new Chart(context2D, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: dataObj[position - 1]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'x on y using pie chart representation',
                fontColor: '#333'
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: 'test123'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    })
}

function buildPieGraph(context2D, dataset, label) {
    console.log(dataset)
    var labels = []
    var values = []
    for (i in dataset) {
        labels.push(dataset[i].x)
        values.push(dataset[i].y)
    }
    new Chart(context2D, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: dataObj[position - 1]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'x on y using doughnut chart representation',
                fontColor: '#333'
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: 'test123'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    })
}

function buildPolarGraph(context2D, dataset, label) {
    console.log(dataset)
    var labels = []
    var values = []
    for (i in dataset) {
        labels.push(dataset[i].x)
        values.push(dataset[i].y)
    }
    new Chart(context2D, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: dataObj[position - 1]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'x on y using polar chart representation',
                fontColor: '#333'
            },
            scales: {
                scaleLabel: {
                    display: true,
                    labelString: 'test123'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
    })
}

var chartBuilder = {
    line: buildLineGraph,
    bar: buildBarGraph,
    radar: buildRadarGraph,
    doughnut: buildDoughnutGraph,
    pie: buildPieGraph,
    polar: buildPolarGraph,
    scatter: buildScatterGraph
}

function getGraphController(chartCanvas, chartJsElement) {
    const graphController = document.createElement('div')
    const buttonsWrapper = document.createElement('div')

    const deleteButton = document.createElement('a')
    const exportAsCSV = document.createElement('a')
    const exportAsJPG = document.createElement('a')
    const exportAsPNG = document.createElement('a')
    const addMoreData = document.createElement('a')

    const graphContainer = document.createElement('div')
    deleteButton.id = 'delete' + String(totalGraphs)
    addMoreData.id = 'add' + String(totalGraphs)

    buttonsWrapper.appendChild(deleteButton)
    buttonsWrapper.appendChild(exportAsCSV)
    buttonsWrapper.appendChild(exportAsJPG)
    buttonsWrapper.appendChild(exportAsPNG)
    buttonsWrapper.appendChild(addMoreData)

    deleteButton.classList.add('controller-button')
    exportAsCSV.classList.add('controller-button')
    exportAsJPG.classList.add('controller-button')
    exportAsPNG.classList.add('controller-button')
    addMoreData.classList.add('controller-button')
    addMoreData.classList.add('add-button')
    deleteButton.classList.add('delete-button')

    deleteButton.href = '#'
    exportAsCSV.href = '#'
    exportAsJPG.href = '#'
    exportAsPNG.href = '#'
    addMoreData.href = '#'

    graphController.appendChild(buttonsWrapper)
    graphController.appendChild(graphContainer)
    graphContainer.appendChild(chartCanvas)

    buttonsWrapper.classList.add('graph-controller-button-wrapper')
    graphContainer.classList.add('graphContainer')
    graphController.classList.add('graphController')

    deleteButton.innerText = 'remove graph'
    exportAsJPG.innerText = 'JPG'
    exportAsCSV.innerText = 'CSV'
    exportAsPNG.innerText = 'PNG'
    addMoreData.innerText = 'Add more data'

    deleteButton.onclick = function() {
        let position = String(this.id).substring(6)
        position = parseInt(position)
        dataObj.splice(position - 1, 1)
        const wrapper = deleteButton.parentElement.parentElement
        const body = wrapper.parentElement
        body.removeChild(wrapper)

        listadd = document.querySelectorAll('.add-button')
        listdel = document.querySelectorAll('.delete-button')
        listcan = document.getElementsByTagName('canvas')

        for (let i = 0; i < listadd.length; i++) {
            let idCurr = parseInt(String(listadd[i].id).substring(3))
            if (idCurr > position) {
                idCurr--
                listadd[i].id = 'add' + String(idCurr)
            }
        }

        for (let i = 0; i < listdel.length; i++) {
            let idCurr = parseInt(String(listdel[i].id).substring(6))
            if (idCurr > position) {
                idCurr--
                listdel[i].id = 'delete' + String(idCurr)
            }
        }

        for (let i = 0; i < listcan.length; i++) {
            let idCurr = parseInt(String(listcan[i].id).substring(6))
            if (idCurr > position) {
                idCurr--
                listcan[i].id = 'canvas' + String(idCurr)
            }
        }

        totalGraphs--
    }

    exportAsCSV.download = 'data.csv'
    exportAsCSV.onclick = () => {
        var result = chartJsElement.data
        const content = result.datasets[0].data
        const labels = result.labels
        let csv = '"x","y"\n'
        content.forEach((val, idx) => {
            csv = csv + `"${labels[idx]}",${val}\n`
        })
        exportAsCSV.href = `data:text/csv;charset=utf-8,${csv}`
    }

    exportAsJPG.download = 'grafic.jpg'
    exportAsJPG.onclick = () => {
        exportAsJPG.href = chartCanvas.toDataURL('image/jpg')
    }

    exportAsPNG.download = 'grafic.png'
    exportAsPNG.onclick = () => {
        exportAsJPG.href = chartCanvas.toDataURL('image/png')
    }

    addMoreData.onclick = function() {
        position = String(this.id).substring(3)
        position = parseInt(position)
        openPopUp()
    }

    return graphController
}

async function getAvailableFields() {
    const url = '/filter/all'
    return await fetch(url)
        .then(data => {
            return data.json()
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return undefined
        })
}

function closePopUp() {
    document.getElementById('invisibleBackground').classList.remove('grayout')
    document.getElementById('popUpForm').classList.remove('visible')
    document.body.style.overflow = ''
    document.getElementsByClassName('floatingButton')[0].classList.remove('invisible')
    document.getElementById('confirmFieldsSelectionButton').classList.add('no-click')
    document.getElementById('xOfGraph').disabled = true
    document.getElementById('yOfGraph').disabled = true
    document.getElementById('typeOfGraph').disabled = true
}

function addNewChart() {
    const xLabel = document.getElementById('xOfGraph').value
    const yLabel = document.getElementById('yOfGraph').value
    const chartType = document.getElementById('typeOfGraph').value
    var paginationOptions = undefined
    if (paginationEnabled) {
        paginationOptions = {
            page: parseInt(document.getElementById('pageNumber').value),
            size: parseInt(document.getElementById('pageResults').value)
        }
    }

    getGraphResults(xLabel, yLabel, paginationOptions).then((filterValues) => {
        var xType, yType, xDetails, yDetails
        for (var i = 0; i < availableFields.length; i++) {
            if (xLabel === availableFields[i].name) {
                xType = availableFields[i].type
                xDetails = availableFields[i].details
            }
            if (yLabel === availableFields[i].name) {
                yType = availableFields[i].type
                yDetails = availableFields[i].details
            }
        }

        var graphValues = mapFilterValues[xType][yType](filterValues)

        var xValues //= graphValues["xFieldName"] //['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11']
        var dataArray //= graphValues["yFieldName"] //[Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300)];

        let chartCanvas
        let flag = false

        if (position === undefined) {
            flag = true
            totalGraphs++
            chartCanvas = document.createElement('canvas')
            chartCanvas.id = 'canvas' + String(totalGraphs)
        } else {
            chartCanvas = document.getElementById('canvas' + String(position))
        }

        if (position === undefined) {
            dataObj.push(new Array())
            dataObj[dataObj.length - 1].push({
                label: yLabel,
                data: dataArray,
                backgroundColor: chartsPallete,
                borderColor: chartsPallete,
                fill: false
            })

            position = dataObj.length
        } else {
            dataObj[position - 1].push({
                label: yLabel,
                data: dataArray,
                backgroundColor: chartsPallete,
                borderColor: chartsPallete,
                fill: false
            })
        }

        chartBuilder[chartType](chartCanvas.getContext('2d'), graphValues, xLabel + ' ' + yLabel)
            // buildPieGraph(chartCanvas.getContext('2d'), graphValues, xLabel+' '+yLabel)

        if (flag) document.getElementById('graphsSection').appendChild(getGraphController(chartCanvas))
        position = undefined
        closePopUp()
    })
}

function openPopUp() {
    document.getElementById('invisibleBackground').classList.add('grayout')
    document.getElementById('popUpForm').classList.add('visible')
    document.body.style.overflow = 'hidden'
    document.getElementsByClassName('floatingButton')[0].classList.add('invisible')
    document.getElementById('confirmFieldsSelectionButton').classList.remove('no-click')
    document.getElementById('xOfGraph').disabled = false
    document.getElementById('yOfGraph').disabled = false
    document.getElementById('typeOfGraph').disabled = false
}

function loadFields() {
    const selectors = document.getElementsByTagName('select')
    console.log(availableFields)
    for (const idx in availableFields) {
        const el = document.createElement('option')
        el.value = availableFields[idx].name
        el.textContent = availableFields[idx].name

        selectors[0].appendChild(el)
        selectors[1].appendChild(el.cloneNode(true))
        if (availableFields[idx].type == 'dummy') {
            if (Math.random() < 0.5) {
                appendContinuousFilter(availableFields[idx].details, availableFields[idx].name, 0, 15, 0.1)
            } else {
                appendDiscreteFilter(availableFields[idx].details, availableFields[idx].name, ['lol', 'bol', 'tzol'])
            }
        } else if (availableFields[idx].type == 'discrete') {
            appendDiscreteFilter(availableFields[idx].details, availableFields[idx].name, availableFields[idx].values)
        } else if (availableFields[idx].type == 'continuous') {
            appendContinuousFilter(availableFields[idx].details, availableFields[idx].name, availableFields[idx].min, availableFields[idx].max, 0.01)
        } else if (availableFields[idx].type == 'date') {
            appendContinuousFilter(availableFields[idx].details, availableFields[idx].name, availableFields[idx].min, availableFields[idx].max, 0.01, true)
        }
    }
}

function appendDiscreteFilter(question, columnName, options) {
    if (options.length == 0) { return }

    totalDiscrete = totalDiscrete + 1
    const flipP = document.createElement('p')
    flipP.innerText = question
    flipP.className = 'flip'
    document.getElementById('popUpForm').appendChild(flipP)
    const discreteFilter = document.createElement('div')
    discreteFilter.id = 'divD' + String(totalDiscrete)
    flipP.onclick = function() {
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

        discreteFilter.appendChild(label)
    }

    document.getElementById('popUpForm').appendChild(discreteFilter)
}

function appendContinuousFilter(question, columnName, min, max, step, isDate) {
    if (String(max) == 'null' || String(min) == 'null') { return }

    totalContinous = totalContinous + 1
    const flipP = document.createElement('p')
    flipP.innerText = question
    flipP.className = 'flip'
    document.getElementById('popUpForm').appendChild(flipP)
    const continousFilter = document.createElement('div')
    continousFilter.id = 'divC' + String(totalContinous)
    flipP.onclick = function() {
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
        range1.oninput = function() {
            const str = this.id
            const value = document.getElementById(str).value
            document.getElementById('L' + str).innerText = value
        }

        range2.oninput = function() {
            const str = this.id
            const value = document.getElementById(str).value
            document.getElementById('L' + str).innerText = value
        }
    }

    document.getElementById('popUpForm').appendChild(continousFilter)
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

function updateAvailableGraphs() {
    console.log('test')
    var xSelector = document.getElementById('xOfGraph')
    var ySelector = document.getElementById('yOfGraph')
    var chartSelector = document.getElementById('typeOfGraph')
    const xType = availableFields.filter((val) => { return val.name === xSelector.value })[0].type
    const yType = availableFields.filter((val) => { return val.name === ySelector.value })[0].type
    document.getElementById('typeOfGraph').innerHTML = ''
    if (xType === 'discrete' && yType === 'discrete') {
        console.log('dd')
        ddOptions.forEach((val, idx) => {
            chartSelector.appendChild(val)
        })
    } else if (xType === 'discrete' && yType === 'continuous') {
        console.log('dc')
        dcOptions.forEach((val, idx) => {
            chartSelector.appendChild(val)
        })
    } else if (xType === 'continuous' && yType === 'discrete') {
        console.log('cd')
        cdOptions.forEach((val, idx) => {
            chartSelector.appendChild(val)
        })
    } else if (xType === 'continuous' && yType === 'continuous') {
        console.log('cc')
        ccOptions.forEach((val, idx) => {
            chartSelector.appendChild(val)
        })
    } else /// This else is called only on testing dummy data
    {
        console.log(allOptions)
        allOptions.forEach((val, idx) => {
            chartSelector.appendChild(val)
        })
    }
}

function switchPagination() {
    console.log(document.getElementById('paginateResults').style.display)
    if (document.getElementById('paginateResults').style.display === 'none' || document.getElementById('paginateResults').style.display === '') {
        document.getElementById('paginateResults').style.display = 'flex'
        paginationEnabled = true
    } else {
        document.getElementById('paginateResults').style.display = 'none'
        paginationEnabled = false
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        fillChartsWithDummyData()
    } catch (e) {
        console.log(e)
    }
    getAvailableFields()
        .then(res => { availableFields = res.columns })
        .then(columns => { loadFields() })
        .then(() => {
            var xSelector = document.getElementById('xOfGraph')
            var ySelector = document.getElementById('yOfGraph')

            updateAvailableGraphs()

            xSelector.addEventListener('change', (ev) => {
                updateAvailableGraphs()
            })

            ySelector.addEventListener('change', (ev) => {
                updateAvailableGraphs()
            })
        })
        .catch(e => { console.log(e) })
}, false)

var totalDiscrete = 0
var totalContinous = 0