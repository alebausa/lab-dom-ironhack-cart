window.onload = function() {
  console.log("Hello world");
  var calculatePriceButton = document.getElementById("calc-price-btn");
  var createItemButton = document.getElementById("new-item-create");
  var deleteButtons = document.getElementsByClassName("btn-delete");

  calculatePriceButton.addEventListener("click", calculateItemPrice);
  createItemButton.onclick = createNewItem;

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = deleteItem;
  }
};

function getTotalPrice() {
  var products = Array.from(document.getElementsByClassName("product"));
  var allTheResults = [];
  var allThePrices = [];
  var pricesVal = [];
  products.forEach(function(product) {
    var result = product.getElementsByClassName("result");
    allTheResults.push(result[0]);
  });
  allTheResults.forEach(function(result) {
    allThePrices.push(result.innerText);
  });
  allThePrices.forEach(function(price) {
    price = price.slice(1);
    price = Number.parseInt(price);
    pricesVal.push(price);
  });
  var totalPrice = pricesVal.reduce(function(acc, val) {
    return acc + val;
  }, 0);
  var container = document.getElementById("total-price");
  container.innerHTML = `<h2>Total price: $${totalPrice}</h2>`;
}

function calculateItemPrice() {
  var products = Array.from(document.getElementsByClassName("product"));
  products.forEach(function(product) {
    let howMany = product.querySelector(".quantity").value;
    let priceText = product.querySelector(".price").innerText;
    let priceFix = priceText.slice(1);
    let priceNum = Number.parseFloat(priceFix);
    let price = priceNum * howMany;
    product.querySelector(".result").innerHTML = `$${price}`;
  });
  getTotalPrice();
}

function deleteItem(event) {
  var toDelete = event.target.parentElement;
  var container = document.getElementById("wrapper");
  container.remove(toDelete);
}

function createNewItem() {
  var inputName = document.querySelector(".add-product-name").value;
  var inputPrice = document.querySelector("#add-product-price").value;
  var newProduct = document.createElement("div");
  var container = document.getElementById("wrapper");
  newProduct.innerHTML = `
        <div class="product">
        <div class="product-name">
          <span class="product-name">
            ${inputName}
          </span>
        </div>
        <div class="priceBox">
          <span class="price">$${inputPrice}</span>
        </div>
        <div class="quantityDiv">
          <label>QTY</label>
          <input type="text" placeholder="0" class="quantity" />
        </div>
        <div>
          <span class="result">$0.00</span>
        </div>
        <div class="delete">
          <button class="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
      `;
  container.appendChild(newProduct);
}
