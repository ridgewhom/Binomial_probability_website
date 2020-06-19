import * as myProbability from '/myProbability.js';
//import Chart from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js'

const form  = document.getElementsByTagName('form')[0];
const div = document.getElementById('divID');
const trialsInput = document.getElementById("trials");
const trialsInputError = document.querySelector("#trials + span.error")
console.log(typeof(trialsInput.value))
const successesInput = document.getElementById("successes");
const successesInputError = document.querySelector("#successes + span.error")
const ctx = document.getElementById("myChart");

//TODO: Change chart to scatter and refactor data to fit



trialsInput.addEventListener('input', function (event){
    if (trialsInput.validity.valid){
        trialsInputError.innerHTML = "";
        trialsInputError.className = "";
    } else {
        showError();
    }
});

function showError() {
    if(trialsInput.validity.valueMissing){
        trialsInputError.textContent = "Please enter the number of trials"
    } else {
        trialsInputError.textContent = "Value must be a positive integer"
    }
    trialsInputError.className = "error active"
}




function addData(chart, dataNew, labels = []) {
    console.log(dataNew)
    labels.forEach(label => chart.data.labels.push(label))
    let newDataset = {
        label : "test",
        data : dataNew,
        fill : 'false',
    }
    //chart.data.labels.push(label);
    chart.data.datasets.push(newDataset)
    //dataNew.forEach(d => chart.data.push(d))

    chart.update();
}


let myChart = new Chart(ctx, {
    type: 'line',
    data: [],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

function myFunction() {
    //console.log('woof')
    //alert('woof')
    //alert(myProbability.cumulativeNegativeBinomialArr(1000,5,.008))
    //div.innerHTML += myProbability.cumulativeNegativeBinomialArr(3000,5,.008).join("<br />")
    let trials = parseInt(trialsInput.value)
    let successes = parseInt(successesInput.value)

    console.log(trials)
    console.log(typeof(trials))

    let probArr = myProbability.cumulativeNegativeBinomialArr(trials,successes,.008)
    let labelsArr = []
    console.log(myChart.datasets)
    if (!myChart.datasets){
        for(let i = 0; i < probArr.length; i+=1){
            labelsArr.push(i.toString())
        }
    }
    addData(myChart,probArr,labelsArr)
    


}


document.querySelector('#hello').addEventListener('click', myFunction)

/*let probArr1 = myProbability.cumulativeNegativeBinomialArr(trials,successes,.008)


let newArr = []
let labelsArr = []
for(let i = 0; i < probArr1.length; i+=1){
    newArr.push(probArr1[i])
    labelsArr.push(i.toString())
}
console.log(newArr)*/

let n = 0.99999999999999989
console.log(n)

let trials = 5000
let successes = 5
let probArr = myProbability.cumulativeNegativeBinomialArr(trials,successes,.008)

console.log(probArr[4000])


console.log('done')