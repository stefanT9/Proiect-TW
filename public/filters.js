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
var totalDiscrete = 0
var totalContinous = 0

function appendDiscreteFilter (question, options) {
  totalDiscrete = totalDiscrete + 1
  const discreteFilter = document.createElement('div')

  discreteFilter.className = 'questionDivDiscrete'
  discreteFilter.id = 'QD' + String(totalDiscrete)
  const questionText = document.createElement('p')
  questionText.innerText = question

  discreteFilter.appendChild(questionText)

  for (let i = 0; i < options.length; i++) {
    const cb = document.createElement('input')

    cb.type = 'checkbox'
    cb.name = options[i] + '_' + String(totalDiscrete)
    cb.value = options[i]
    cb.id = cb.name

    const label = document.createElement('label')
    label.className = 'container'
    label.appendChild(cb)

    const span = document.createElement('span')
    span.className = 'checkmark'

    label.appendChild(span)

    label.for = cb.name
    label.innerText = options[i]

    discreteFilter.appendChild(label)
  }

  document.getElementById('questions').appendChild(discreteFilter)
}

function appendContinuousFilter (question, min, max, step, isDate) {
  totalContinous = totalContinous + 1
  const continousFilter = document.createElement('div')

  continousFilter.className = 'questionDivContinuous'
  continousFilter.id = 'QC' + String(totalContinous)
  const questionText = document.createElement('p')
  questionText.innerText = question

  continousFilter.appendChild(questionText)

  const range1 = document.createElement('input')
  range1.type = (isDate ? 'date' : 'range')
  range1.min = min
  range1.max = max
  if (!isDate) { range1.step = step }

  range1.value = min
  range1.name = 'Min_' + String(totalContinous)
  range1.id = 'Min_' + String(totalContinous)

  const range2 = document.createElement('input')
  range2.type = (isDate ? 'date' : 'range')
  range2.min = min
  range2.max = max
  if (!isDate) { range2.step = step }
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

  document.getElementById('questions').appendChild(continousFilter)
}

function getFilters () {
  var discreteQuestions = document.querySelectorAll('.questionDivDiscrete > input')
  var continousQuestions = document.querySelectorAll('.questionDivContinuous > input')
  var countContinuous = document.querySelectorAll('.questionDivContinuous').length
  var countDiscrete = document.querySelectorAll('.questionDivDiscrete').length

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

          console.log('Value ' + String(value) + ' for question ' + String(questionNumber))
        }
      }
    }
  }

  console.log('Final Discrete')
  console.log(answersDiscrete)

  const answersContinous = new Array()

  for (let i = 0; i < continousQuestions.length; i += 2) {
    let value1 = parseInt(continousQuestions[i].value)
    let value2 = parseInt(continousQuestions[i + 1].value)

    if (isNaN(value1) || isNaN(value2) || continousQuestions[i].type == 'date') {
      value1 = continousQuestions[i].value
      value2 = continousQuestions[i + 1].value
    }

    if (value1 > value2) {
      const temp = value1
      value1 = value2
      value2 = temp
    }

    const questionNumber = i / 2 + 1

    console.log('Question Continous ' + String(questionNumber))
    console.log('Interval: ' + String(value1) + ' - ' + String(value2))

    answersContinous.push([value1, value2])
  }

  console.log('Final Continous')
  console.log(answersContinous)
  // TODO: transform to mongoose querry json
}

async function getResultsFromFilters (filters, columns, paginationOptions) {
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
    '/values/find',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  )
  return response.json()
}

async function getGraphResults (xFieldName, yFieldName, paginationOptions) {
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
