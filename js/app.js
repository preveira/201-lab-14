'use strict';

function AppState() {
  this.allProducts = [];
}

AppState.prototype.instantiateProducts = function () {

  const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] === 'sweep') {
      this.allProducts.push(new Product(productNames[i], 'png'))
    } else {
      this.allProducts.push(new Product(productNames[i]))
    }
  }

}

AppState.prototype.saveToLocalStorage = function () {
  const productsJson = JSON.stringify(this.allProducts);
  localStorage.setItem('allProducts', productsJson);
  console.log(productsJson)
}

AppState.prototype.loadItems = function () {
const productsJson = localStorage.getItem('allProducts');
// console.log('HERE ARE THE PRODUCTS FROM LOCALSTORAGE', productsJson);
  if (productsJson) {
    const productsArray = JSON.parse(productsJson);
    this.allProducts = productsArray.map(product => new Product(product.name, product.source.split('.').pop(), product.timesClicked, product.timesShown));
    console.log('HERE IS ALL PRODUCTS', this.allProducts);
  } else {
    this.instantiateProducts();
  }
}
    
// TODO: Update this instance method to retrieve data from local storage instead of creating new Products on each page load
function fetchData() {
  JSON.stringify(localStorage.getItem('allProducts'));
}

// this.instantiateProducts();

function Product(name, fileExtension = 'jpg', timesClicked = 0, timesShown = 0) {
  this.name = name;
  this.source = `assets/${name}.${fileExtension}`;
  this.timesClicked = timesClicked;
  this.timesShown = timesShown;
}