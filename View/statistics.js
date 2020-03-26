var charts = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5', 'chart6']
for (var ch in charts) {
    console.log(ch);
    var ctx = document.getElementById(charts[ch]).getContext('2d');
    console.log(ctx);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Italia', 'Franta', 'Romania', 'Japonia', 'China', 'Taiwan'],
            datasets: [{
                label: `scores in year ${2010+parseInt(ch)}`,
                data: [Math.floor(300+Math.random()*300),Math.floor(300+Math.random()*300),Math.floor(300+Math.random()*300),Math.floor(300+Math.random()*300),Math.floor(300+Math.random()*300),Math.floor(300+Math.random()*300)],
                backgroundColor: [
                    'rgba(100, 143, 200, 0.2)',
                    'rgba(143, 100, 100, 0.2)',
                    'rgba(100, 143, 200, 0.2)',
                    'rgba(100, 200, 143, 0.2)',
                    'rgba(200, 143, 100, 0.2)',
                    'rgba(143, 200, 100, 0.2)',
                ],
                borderColor: [
                    'rgba(100, 100, 100, 0.2)',
                    'rgba(100, 100, 100, 0.2)',
                    'rgba(100, 100, 100, 0.2)',
                    'rgba(100, 100, 100, 0.2)',
                    'rgba(100, 100, 100, 0.2)',
                    'rgba(100, 100, 100, 0.2)',
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
    });
}