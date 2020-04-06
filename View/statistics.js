let availableFields = ['field1', 'field2', 'field3', 'asdasdas', 'asdsad asdas a f af', 'a sffwefeafsdfa', 'asdfa', 'teleenciclopedie']
const chosenFields = []

function getAvailableFields () {
  availableFields = ['field1', 'field2', 'field3', 'asdasdas', 'asdsad asdas a f af', 'a sffwefeafsdfa', 'asdfa', 'teleenciclopedie']
}

function updateFilterSection () {
  const filterSection = document.getElementsByClassName('form-filter')[0]
  filterSection.innerHTML = ''
  for (const idx in chosenFields) {
    const newChild = document.createElement('div')
    newChild.textContent = chosenFields[idx]
    newChild.className = 'selected-field'
    filterSection.appendChild(newChild)
  }
}

function closePopUp () {
  document.getElementById('fieldsPopUpForm').style.opacity = '0'
  document.getElementById('invisibleBackground').style.zIndex = '-1'
  document.getElementById('invisibleBackground').style.opacity = '0'
  document.getElementById('fieldsPopUpForm').style.zIndex = '-1'
  document.body.style.overflow = 'visible'

  updateFilterSection()
  fillChartsWithDummyData()
}

function openPopUp () {
  document.getElementById('fieldsPopUpForm').style.zIndex = '2'
  document.getElementById('fieldsPopUpForm').style.opacity = '1'
  document.getElementById('invisibleBackground').style.zIndex = '1'
  document.getElementById('invisibleBackground').style.backgroundColor = '#808080'
  document.getElementById('invisibleBackground').style.opacity = '0.7'
  document.body.style.overflow = 'hidden'
}
function loadFields () {
  const fieldsWrapper = $('.fieldsWrapper')[0]
  for (const idx in availableFields) {
    const el = document.createElement('button')
    el.className = 'deselected-field-wrapper'
    el.addEventListener('click', ev => {
      if (el.className === 'selected-field-wrapprer') {
        const index = chosenFields.indexOf(el.textContent)
        if (index !== -1) chosenFields.splice(index, 1)

        el.className = 'deselected-field-wrapper'
      } else if (el.className === 'deselected-field-wrapper') {
        chosenFields.push(el.textContent)
        el.className = 'selected-field-wrapprer'
      }
    })
    el.textContent = availableFields[idx]
    fieldsWrapper.appendChild(el)
    console.log(fieldsWrapper)
  }
}

function fillChartsWithDummyData () {
  var charts = ['chart1', 'chart2', 'chart3']
  var type = ['bar', 'line', 'horizontalBar']
  for (var ch in charts) {
    const chart = document.getElementById(charts[ch])
    var myChart = new Chart(chart.getContext('2d'), {
      type: type[ch],
      data: {
        labels: ['Italia', 'Franta', 'Romania', 'Japonia', 'China', 'Taiwan'],
        datasets: [{
          label: `scores in year ${2010 + parseInt(ch)}`,
          data: [Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300), Math.floor(300 + Math.random() * 300)],
          backgroundColor: [
            'rgba(100, 143, 200, 0.2)',
            'rgba(143, 100, 100, 0.2)',
            'rgba(100, 143, 200, 0.2)',
            'rgba(100, 200, 143, 0.2)',
            'rgba(200, 143, 100, 0.2)',
            'rgba(143, 200, 100, 0.2)'
          ],
          borderColor: [
            'rgba(100, 100, 100, 0.2)',
            'rgba(100, 100, 100, 0.2)',
            'rgba(100, 100, 100, 0.2)',
            'rgba(100, 100, 100, 0.2)',
            'rgba(100, 100, 100, 0.2)',
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
  }
}
function fillChartsWithRealData () {

}

document.addEventListener('DOMContentLoaded', function () {
  try {
    fillChartsWithDummyData()
  } catch (e) {

  }
  try {
    getAvailableFields()
  } catch (e) {

  }
  try {
    loadFields()
  } catch (e) {

  }
}, false)
