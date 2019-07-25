'use strict'
var productImagesEl = document.getElementById('productImages');
var productOneEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('productThree');

var allProducts = [];
var recentRandomNumbers = [];
var totalClicks = 0;

function RandomProduct(name, filetype) {
    this.name = name;
    this.filepath = `img/${name}.${filetype}`; // template literal
    this.votes = 0;
    this.views = 0;

    allProducts.push(this);
}

function renderLocal() {
    if (localStorage.length === 0) {
        console.log('made it');
        instantiateProducts();
    } else {
        console.log('in the else');
        var storageProducts = localStorage.getItem('pageData');
        var parsedProducts = JSON.parse(storageProducts);
        allProducts = parsedProducts;
    }
    render(productOneEl);
    render(productTwoEl);
    render(productThreeEl);
}


function instantiateProducts() {
    new RandomProduct('bag', 'jpg');
    new RandomProduct('banana', 'jpg');
    new RandomProduct('bathroom', 'jpg');
    new RandomProduct('boots', 'jpg');
    new RandomProduct('breakfast', 'jpg');
    new RandomProduct('bubblegum', 'jpg');
    new RandomProduct('chair', 'jpg');
    new RandomProduct('cthulhu', 'jpg');
    new RandomProduct('dog-duck', 'jpg');
    new RandomProduct('dragon', 'jpg');
    new RandomProduct('pen', 'jpg');
    new RandomProduct('pet-sweep', 'jpg');
    new RandomProduct('scissors', 'jpg');
    new RandomProduct('shark', 'jpg');
    new RandomProduct('sweep', 'png');
    new RandomProduct('tauntaun', 'jpg');
    new RandomProduct('unicorn', 'jpg');
    new RandomProduct('usb', 'gif');
    new RandomProduct('water-can', 'jpg');
    new RandomProduct('wine-glass', 'jpg');
}
// instantiateProducts();

function render(imageEl) {
    var randomIndex = getUniqueRandom()
    allProducts[randomIndex].views++;

    imageEl.src = allProducts[randomIndex].filepath;
    imageEl.alt = allProducts[randomIndex].name;
    imageEl.title = allProducts[randomIndex].name;
}


//helper functions

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
        generateChart();
        generateProductPercentage();
        renderCharts();
        var stringifyAllProducts = JSON.stringify(allProducts);
        localStorage.setItem('pageData', stringifyAllProducts);
    }
    render(productOneEl);
    render(productTwoEl);
    render(productThreeEl);
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

    // buttonEl.addEventListener('click', function() { localStorage.clear(); });

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

// allProducts.sort(function(a,b)){
//     if(a.votes < b.votes){
//         return 1;
//     } else {
//         return -1;
//     }
// };

//Ternary Operator

// allProducts.sort(functio(a,b)){
//     a.votes < b.votes ? 1 : -1;
// }
renderLocal();