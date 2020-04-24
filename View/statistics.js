var chosenFields = []
var availableFields = []

function getGraphController (chartCanvas){
    const graphController=document.createElement('div')
    const deleteButton = document.createElement('button')
    
    graphController.classList.add('graphController')
    graphController.appendChild(deleteButton)
    graphController.appendChild(chartCanvas)
    
    deleteButton.innerText='remove graph'
    deleteButton.onclick=()=>{console.log('not implemented')}

    return graphController
}

async function getAvailableFields() {
    const url = 'http://localhost:3000/filter/all'
    const res = await fetch(url)
    .then(data=>{return data.json()})
    .then(res=>{return res})
    .catch(err=>{return undefined})
    return res
}

function closePopUp() {
    document.getElementById('invisibleBackground').classList.remove('grayout')
    document.getElementById('fieldsPopUpForm').classList.remove('visible')
    document.body.style.overflow=''
}
function addNewChart()
{
    const xLabel='testX'
    const yLabel='testY'
    const chartType='bar'
    const dataArray = [Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300)]
    const chartCanvas = document.createElement('canvas')

    var myChart = new Chart(chartCanvas.getContext('2d'), {
        type: chartType,
        data: {
            label: xLabel,
            datasets: [{
                label: 'datasetLabel',
                data: dataArray,
                backgroundColor: [
                    'rgba(143, 200, 100, 0.2)'
                ],
                borderColor: [
                    'rgba(100, 100, 100, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })

    document.getElementById('graphsSection').appendChild(getGraphController(chartCanvas))
    closePopUp()
}
function openPopUp() {
    document.getElementById('invisibleBackground').classList.add('grayout')
    document.getElementById('fieldsPopUpForm').classList.add('visible')
    document.body.style.overflow='hidden'
}

function loadFields() {
    const selectors = document.getElementsByTagName('select')
    console.log(availableFields)
    for (const idx in availableFields) {
        const el = document.createElement('option')
        el.value = availableFields[idx]['name']
        el.textContent = availableFields[idx]['name']

        selectors[0].appendChild(el)
        selectors[1].appendChild(el.cloneNode(true))
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        fillChartsWithDummyData()
    } catch (e) {
        console.log(e)
    }
    getAvailableFields()
    .then(res=>{availableFields=res.columns})
    .then(columns=>{loadFields()})
    .catch(e=>{console.log(e)})
}, false)