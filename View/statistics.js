let availableFields = [];

function getGraphController (chartCanvas) {
  const graphController = document.createElement('div');
  const buttonsWrapper = document.createElement('div');
  const deleteButton = document.createElement('button');
  const exportAsCSV = document.createElement('button');
  const exportAsJPG = document.createElement('button');
  const exportAsPNG = document.createElement('button');

  const graphContainer = document.createElement('div');

  buttonsWrapper.classList.add('graph-controller-button-wrapper')

  buttonsWrapper.appendChild(deleteButton);
  buttonsWrapper.appendChild(exportAsCSV);
  buttonsWrapper.appendChild(exportAsJPG);
  buttonsWrapper.appendChild(exportAsPNG);

  graphController.appendChild(buttonsWrapper);
  graphController.appendChild(graphContainer);
  graphContainer.appendChild(chartCanvas);

  

  graphContainer.classList.add('graphContainer');
  graphController.classList.add('graphController');

  deleteButton.innerText = 'remove graph';
  exportAsJPG.innerText = 'JPG'
  exportAsCSV.innerText = 'CSV'
  exportAsPNG.innerText = 'PNG'

  deleteButton.onclick = () => { console.log('not implemented') };

  return graphController
}

async function getAvailableFields () {
  const url = 'http://localhost:3000/filter/all';
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

function closePopUp () {
  document.getElementById('invisibleBackground').classList.remove('grayout');
  document.getElementById('fieldsPopUpForm').classList.remove('visible');
  document.body.style.overflow = ''
}
function addNewChart () {
  const xLabel = 'testX';
  const yLabel = 'testY';
  const chartType = 'line';
  const dataArray = [Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300)];
  const chartCanvas = document.createElement('canvas');

  const myChart = new Chart(chartCanvas.getContext('2d'), {
    type: chartType,
    data: {
      label: xLabel,
      datasets: [{
        label: 'dataset1',
        data: dataArray,
        backgroundColor: 'rgba(143, 200, 100, 0.2)',
        borderColor: 'rgba(143, 200, 100, 0.2)',
        fill: false
    },]
    },
    options: {
      responsive:true,
      title:{
          display:true,
          text: `${xLabel} on ${yLabel} using ${chartType} representation`,
          fontColor: "#333"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  document.getElementById('graphsSection').appendChild(getGraphController(chartCanvas));
  closePopUp()
}
function openPopUp () {
  document.getElementById('invisibleBackground').classList.add('grayout');
  document.getElementById('fieldsPopUpForm').classList.add('visible');
  document.body.style.overflow = 'hidden'
}

function loadFields () {
  const selectors = document.getElementsByTagName('select');
  console.log(availableFields);
  for (const idx in availableFields) {
    const el = document.createElement('option');
    el.value = availableFields[idx].name;
    el.textContent = availableFields[idx].name;

    selectors[0].appendChild(el);
    selectors[1].appendChild(el.cloneNode(true))
  }
}

document.addEventListener('DOMContentLoaded', function () {
  try {
    fillChartsWithDummyData()
  } catch (e) {
    console.log(e)
  }
  getAvailableFields()
    .then(res => { availableFields = res.columns })
    .then(columns => { loadFields() })
    .catch(e => { console.log(e) })
}, false);
