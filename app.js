'use strict'
var productImagesEl = document.getElementById('productImages');
var productOneEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('productThree');

var allProducts = [];
var recentRandomNumbers = [];
var totalClicks = 0;

function randomProduct(name, filetype) {
    this.name = name;
    this.filepath = `img/${name}.${filetype}`;
    this.votes = 0;
    this.views = 0;

    allProducts.push(this);
}

new randomProduct('bag', 'jpg');
new randomProduct('banana', 'jpg');
new randomProduct('bathroom', 'jpg');
new randomProduct('boots', 'jpg');
new randomProduct('breakfast', 'jpg');
new randomProduct('bubblegum', 'jpg');
new randomProduct('chair', 'jpg');
new randomProduct('cthulhu', 'jpg');
new randomProduct('dog-duck', 'jpg');
new randomProduct('dragon', 'jpg');
new randomProduct('pen', 'jpg');
new randomProduct('pet-sweep', 'jpg');
new randomProduct('scissors', 'jpg');
new randomProduct('shark', 'jpg');
new randomProduct('sweep', 'png');
new randomProduct('tauntaun', 'jpg');
new randomProduct('unicorn', 'jpg');
new randomProduct('usb', 'gif');
new randomProduct('water-can', 'jpg');
new randomProduct('wine-glass', 'jpg');

// var productList = document.getElementById('listData');
// var ulEl = document.createElement('ul');
// productList.appendChild(ulEl);

// randomProduct.prototype.renderTotalVotes = function() {
//     var liEl = document.createElement('li');
//     liEl.textContent = `${this.votes} votes for the ${this.name}.`;
//     ulEl.appendChild(liEl);
// }

function render() {
    var randomIndex = getUniqueRandom()
    allProducts[randomIndex].views++;

    productOneEl.src = allProducts[randomIndex].filepath;
    productOneEl.alt = allProducts[randomIndex].name;
    productOneEl.title = allProducts[randomIndex].name;

    var randomIndex = getUniqueRandom()
    allProducts[randomIndex].views++;

    productTwoEl.src = allProducts[randomIndex].filepath;
    productTwoEl.alt = allProducts[randomIndex].name;
    productTwoEl.title = allProducts[randomIndex].name;

    var randomIndex = getUniqueRandom()
    allProducts[randomIndex].views++;

    productThreeEl.src = allProducts[randomIndex].filepath;
    productThreeEl.alt = allProducts[randomIndex].name;
    productThreeEl.title = allProducts[randomIndex].name;
}


//helper functions

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

render();

function getUniqueRandom() {
    var randomIndex = randomNumber(0, allProducts.length - 1);

    while (recentRandomNumbers.includes(randomIndex)) {
        randomIndex = randomNumber(0, allProducts.length - 1);
    }
    if (recentRandomNumbers.length > 5) {
        recentRandomNumbers.shift();
    }
    recentRandomNumbers.push(randomIndex);
    return randomIndex;
}

function handleClick() {
    var chosenImage = event.target.alt;
    console.log('my chosen image is ', chosenImage);
    totalClicks++;

    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === chosenImage) {
            allProducts[i].votes++
        }
    }
    if (totalClicks > 24) {
        productImagesEl.removeEventListener('click', handleClick, true);
        // for (var i = 0; i < allProducts.length; i++) {
        //     allProducts[i].renderTotalVotes();
        // }
        generateChart();
        generateProductPercentage();
        renderCharts();
        console.log('made it here')
    }
    render();
}
productImagesEl.addEventListener('click', handleClick, true);

var productNamesArray = [];
var productVotesArray = [];
var productViewsArray = [];
var productPercentageArray = [];

function generateChart() {
    for (var i = 0; i < allProducts.length; i++) {
        productNamesArray.push(allProducts[i].name);
        productVotesArray.push(allProducts[i].votes);
        productViewsArray.push(allProducts[i].views);
    }
}

function generateProductPercentage() {
    var productPercentage = 0;
    for (var i = 0; i < productVotesArray.length; i++) {
        if (productVotesArray[i] === 0) {
            productPercentageArray.push(productVotesArray[i]);
        } else {
            productPercentage = ((productVotesArray[i] / productViewsArray[i]) * 100);
            productPercentageArray.push(productPercentage);
        }
    }
}

function renderCharts() {
    //chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: productNamesArray,
            datasets: [{
                label: '# of Votes',
                data: productVotesArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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

    //PieChart.js
    var ctx = document.getElementById('myPercentageChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: productNamesArray,
            datasets: [{
                label: 'Percentage of How Often This Item Was Picked',
                data: productPercentageArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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