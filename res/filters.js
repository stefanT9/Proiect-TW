var totalDiscrete = 0;
var totalContinous = 0;

function appendDiscreteFilter(question, options) {
    totalDiscrete = totalDiscrete + 1;
    let discreteFilter = document.createElement('div');

    discreteFilter.className = "questionDivDiscrete";
    discreteFilter.id = "QD" + String(totalDiscrete);
    let questionText = document.createElement('p');
    questionText.innerText = question;

    discreteFilter.appendChild(questionText);

    for (let i = 0; i < options.length; i++) {
        let cb = document.createElement('input');

        cb.type = "checkbox";
        cb.name = options[i] + '_' + String(totalDiscrete);
        cb.value = options[i];
        cb.id = cb.name;

        discreteFilter.appendChild(cb);

        let label = document.createElement('label');

        label.for = cb.name;
        label.innerText = options[i];

        discreteFilter.appendChild(label);
    }

    document.getElementById("questions").appendChild(discreteFilter);
}

function appendContinuousFilter(question, min, max, step, isDate) {
    totalContinous = totalContinous + 1;
    let continousFilter = document.createElement('div');

    continousFilter.className = "questionDivContinuous";
    continousFilter.id = "QC" + String(totalContinous);
    let questionText = document.createElement('p');
    questionText.innerText = question;

    continousFilter.appendChild(questionText);

    let range1 = document.createElement('input');
    range1.type = (isDate ? "date" : "range");
    range1.min = min;
    range1.max = max;
    if (!isDate)
        range1.step = step;

    range1.value = min;
    range1.name = 'Min_' + String(totalContinous);
    range1.id = 'Min_' + String(totalContinous);

    let range2 = document.createElement('input');
    range2.type = (isDate ? "date" : "range");
    range2.min = min;
    range2.max = max;
    if (!isDate)
        range2.step = step;
    range2.value = max;
    range2.name = 'Max_' + String(totalContinous);
    range2.id = 'Max_' + String(totalContinous);

    let label1 = document.createElement('label');
    label1.id = "LMin_" + String(totalContinous);
    label1.innerText = (isDate ? "From: " : String(min));

    if (isDate) {
        continousFilter.appendChild(label1);
        continousFilter.appendChild(range1);
    } else {
        continousFilter.appendChild(range1);
        continousFilter.appendChild(label1);
    }

    let spacer = document.createElement("div");

    continousFilter.appendChild(spacer);

    let label2 = document.createElement('label');
    label2.id = "LMax_" + String(totalContinous);
    label2.innerText = (isDate ? "To: " : String(max));

    if (isDate) {
        continousFilter.appendChild(label2);
        continousFilter.appendChild(range2);
    } else {
        continousFilter.appendChild(range2);
        continousFilter.appendChild(label2);
    }

    if (!isDate) {
        range1.oninput = function() {
            let str = this.id;
            let value = document.getElementById(str).value;
            document.getElementById("L" + str).innerText = value;
        };

        range2.oninput = function() {
            let str = this.id;
            let value = document.getElementById(str).value;
            document.getElementById("L" + str).innerText = value;
        }
    }

    document.getElementById("questions").appendChild(continousFilter);
}

function getFilters() {
    var discreteQuestions = document.querySelectorAll(".questionDivDiscrete > input");
    var continousQuestions = document.querySelectorAll(".questionDivContinuous > input");
    var countContinuous = document.querySelectorAll(".questionDivContinuous").length;
    var countDiscrete = document.querySelectorAll(".questionDivDiscrete").length;

    let answersDiscrete = new Array();

    for (let i = 0; i < countDiscrete; i++) {
        answersDiscrete.push(new Array())
    }

    for (let i = 0; i < discreteQuestions.length; i++) {
        if (discreteQuestions[i].checked == true) {
            for (let j = 0; j < discreteQuestions[i].id.length; j++) {
                if (discreteQuestions[i].id[j] == '_') {
                    let value = discreteQuestions[i].id.substring(0, j);
                    let questionNumber = discreteQuestions[i].id.substring(j + 1);
                    answersDiscrete[questionNumber - 1].push(value);

                    console.log("Value " + String(value) + " for question " + String(questionNumber))
                }
            }
        }
    }

    console.log("Final Discrete");
    console.log(answersDiscrete);

    let answersContinous = new Array();

    for (let i = 0; i < continousQuestions.length; i += 2) {
        let value1 = parseInt(continousQuestions[i].value);
        let value2 = parseInt(continousQuestions[i + 1].value);

        if (isNaN(value1) || isNaN(value2) || continousQuestions[i].type == "date") {
            value1 = continousQuestions[i].value;
            value2 = continousQuestions[i + 1].value;
        }

        if (value1 > value2) {
            let temp = value1;
            value1 = value2;
            value2 = temp;
        }

        let questionNumber = i / 2 + 1;

        console.log("Question Continous " + String(questionNumber));
        console.log("Interval: " + String(value1) + " - " + String(value2));

        answersContinous.push([value1, value2]);
    }

    console.log("Final Continous");
    console.log(answersContinous);
    // TODO: transform to mongoose querry json
}

module.exports = { appendDiscreteFilter, appendContinuousFilter, getFilters }