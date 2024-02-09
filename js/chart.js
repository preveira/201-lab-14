'use strict';

document.addEventListener('DOMContentLoaded', function() {
  
    let canvasElem = document.getElementById('chart');
    let chartSection = document.getElementById('chart-section');
  
    // Function to fetch data from local storage
    function fetchData() {
      return JSON.parse(localStorage.getItem('allProducts')) || [];
    }
  
    // Instantiate a new AppState
    let appState = new AppState();
  
    // Use a method on the AppState to load vote data from localStorage
    appState.loadItems();
  
    /* TODO:
     * - Create a data object for chart.js using your AppState's allProducts array.
     * - Combine the data object with configuration information for chart.js type, colors, etc
     * - Call chart.js with the configuration and the canvasElem
     *
     */
    function renderChart() {
      // Get data from AppState
      let products = appState.allProducts;
  
   
      let chartData = {
        labels: products.map(product => product.name),
        datasets: [{
          label: 'Times Clicked',
          data: products.map(product => product.timesClicked),
          backgroundColor: 'rgba(255, 99, 132, 0.2)', 
          borderColor: 'rgba(255, 99, 132, 1)', 
          borderWidth: 1
        },
        {
          label: 'Times Shown',
          data: products.map(product => product.timesShown),
          backgroundColor: 'rgba(54, 162, 235, 0.2)', 
          borderColor: 'rgba(54, 162, 235, 1)', 
          borderWidth: 1
        }]
      };
  

      let chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
  
   
      let myChart = new Chart(canvasElem, chartConfig);
  

      viewResults();
    }

    function clearData() {
      localStorage.removeItem('allProducts');
      location.reload();
    }
  

    function viewResults() {
        //unsure if code needed here. but buttons are removed when I edit to populate data on chart
      console.log('HERE ARE THE PRODUCTS IN STATE', appState.allProducts);
    }
  

    renderChart();
  
    //clear data button
    let clearButton = document.createElement('button');
    clearButton.id = 'start-over';
    clearButton.textContent = 'Clear Data';
    clearButton.addEventListener('click', clearData);
    chartSection.appendChild(clearButton);
  
    //view results
    let viewResultsButton = document.createElement('button');
    viewResultsButton.id = 'result-button';
    viewResultsButton.textContent = 'View Results Here';
    viewResultsButton.addEventListener('click', viewResults);
    chartSection.appendChild(viewResultsButton);
  });
  