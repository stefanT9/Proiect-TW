var availableFields = [
  {
    'name' : 'field1',
    'type' : 'categorical',
    'values' : [1,2,3,4]
  }, 
  {
    'name' : 'field2',
    'type' : 'categorical',
    'values' : [1,2,3,4]
  },
  {
    'name' : 'field3',
    'type' : 'continuous',
    'min' : 0,
    'max' : 100
  },
]

var chosenFields = []

function getAvailableFields () {
  // TODO => set the value for availableFields using an api call
}
function addCategoricalField(filterSection, field)
{
  const newChild = document.createElement('div')
  newChild.textContent = field['name']

  newChild.className = 'selected-categorical-field'

  filterSection.appendChild(newChild)
}
function addContinuosField(filterSection,field)
{
  const newChild = document.createElement('div')
  newChild.textContent = field['name']

  newChild.className = 'selected-categorical-field'

  filterSection.appendChild(newChild)
}
function updateFilterSection () {
  const filterSection = document.getElementsByClassName('form-filter')[0]
  filterSection.innerHTML = ''
  for (const idx in chosenFields) {
    if( chosenFields[idx].type === 'categorical')
    {
      addCategoricalField(filterSection, chosenFields[idx])
    }
    else
    {
      addContinuosField(filterSection,chosenFields[idx])
    }
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
    el.textContent = availableFields[idx]['name']

     

    el.addEventListener('click', ev => {

      const ref = availableFields.find( o => o.name === el.textContent.toString() )
      if (el.className === 'selected-field-wrapprer') {
        const index = chosenFields.indexOf(ref)
        if (index !== -1) chosenFields.splice(index, 1)

        el.className = 'deselected-field-wrapper'
      } else if (el.className === 'deselected-field-wrapper') {
        chosenFields.push(ref)
        el.className = 'selected-field-wrapprer'
      }
    })
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
