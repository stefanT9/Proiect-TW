let availableFields = [];
let chartsPallete=['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43' ,'#ffa600']

function getGraphController (chartCanvas) {
  const graphController = document.createElement('div');
  const buttonsWrapper = document.createElement('div');

  const deleteButton = document.createElement('a');
  const exportAsCSV = document.createElement('a');
  const exportAsJPG = document.createElement('a');
  const exportAsPNG = document.createElement('a');

  const graphContainer = document.createElement('div');

  buttonsWrapper.appendChild(deleteButton);
  buttonsWrapper.appendChild(exportAsCSV);
  buttonsWrapper.appendChild(exportAsJPG);
  buttonsWrapper.appendChild(exportAsPNG);

  deleteButton.classList.add('controller-button')
  exportAsCSV.classList.add('controller-button')
  exportAsJPG.classList.add('controller-button')
  exportAsPNG.classList.add('controller-button')
  
  deleteButton.href='#'
  exportAsCSV.href='#'
  exportAsJPG.href='#'
  exportAsPNG.href='#'

  graphController.appendChild(buttonsWrapper);
  graphController.appendChild(graphContainer);
  graphContainer.appendChild(chartCanvas);


  buttonsWrapper.classList.add('graph-controller-button-wrapper')
  graphContainer.classList.add('graphContainer');
  graphController.classList.add('graphController');


  deleteButton.innerText = 'remove graph';
  exportAsJPG.innerText = 'JPG'
  exportAsCSV.innerText = 'CSV'
  exportAsPNG.innerText = 'PNG'

  deleteButton.onclick = () => { 
    const wrapper=deleteButton.parentElement.parentElement
    const body= wrapper.parentElement
    body.removeChild(wrapper)
  };

  exportAsCSV.download='data.csv'
  exportAsCSV.onclick = () =>{
    console.log('not implemented')
  }

  exportAsJPG.download='grafic.jpg'
  exportAsJPG.onclick = () => {
    exportAsJPG.href = chartCanvas.toDataURL("image/jpg")
  }

  exportAsJPG.download='grafic.png'
  exportAsPNG.onclick = () => {
    exportAsJPG.href = chartCanvas.toDataURL("image/png")
  }

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
  document.getElementById('popUpForm').classList.remove('visible');
  document.body.style.overflow = ''
  document.getElementsByClassName('floatingButton')[0].classList.remove('invisible')
}
function addNewChart () {
  const xLabel = document.getElementById('xOfGraph').value
  const yLabel = document.getElementById('yOfGraph').value
  const chartType = document.getElementById('typeOfGraph').value;

  const xValues = ['test1','test2','test3','test4','test5','test6','test7','test8','test9','test10','test11']
  const dataArray = [Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300)];
  const chartCanvas = document.createElement('canvas');

  const myChart = new Chart(chartCanvas.getContext('2d'), {
    type: chartType,
    data: {
      labels: xValues,
      datasets: [{
        label: yLabel,
        data: dataArray,
        backgroundColor: chartsPallete,
        borderColor: chartsPallete,
        fill: false
    },]
    },
    options: {
      responsive:true,
      maintainAspectRatio: false,
      title:{
          display:true,
          text: `x on y using ${chartType} representation`,
          fontColor: "#333"
      },
      scales: {
        scaleLabel:{
          display:true,
          labelString: 'test123'
        },
        yAxes: [{
          ticks: {
            beginAtZero: false
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
  document.getElementById('popUpForm').classList.add('visible');
  document.body.style.overflow = 'hidden'
  document.getElementsByClassName('floatingButton')[0].classList.add('invisible')

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
