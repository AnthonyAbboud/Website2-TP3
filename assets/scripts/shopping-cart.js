/* Service */
const Service = {
  /* Increments the quantity of an item */
  addOneItem: (itemID) => {
    currentAmount = parseInt(localStorage.getItem(itemID));
    localStorage.setItem(itemID, (currentAmount+1));
    Service.loadShoppingCart();
    ServiceHeader.loadCurrentShoppingCart();
  },

  /* Sorts the shopping cart alphabetically */
  alphabetizeList: () => {
    products.sort(function(a, b) {
      if (a["name"] < b["name"]) {
        return -1;
      } else if (a["name"] > b["name"]) {
        return 1;
      }
      else {
        return 0;
      }
    });
  },

  /* Removes an item from the shopping cart */
  deleteProduct: (itemRow, id) => {
    if(confirm("Voulez-vous supprimer le produit du panier?")) {
      $(itemRow).closest('tr').remove();
      localStorage.removeItem(String(id));
      Service.loadShoppingCart();
      ServiceCurrentShoppingCart.loadCurrentShoppingCart();
    }
    else{}
  },

  /* Empties the shopping cart */
  emptyCart: () => {
    if(confirm("Voulez-vous supprimer tous les produits du panier?")) {
      localStorage.clear();
      Service.loadShoppingCart();
      ServiceCurrentShoppingCart.loadCurrentShoppingCart();
    }
    else{}
  },

  /* Replaces dots to commas for display */
  formatPrice: (price) => {
    return price.toFixed(2).replace(".", ",");
  }, 

  /* Loads the items and quantities from localStorage */
  loadShoppingCart: () => {
    products = [];
    $.getJSON('/data/products.json',function(data){
      for(let i = 0; i < localStorage.length; i++){
        $.each(data, function (index, product) {
          if (localStorage.key(i) == product.id){
            products.push(product);
          }
        });
      }
      Service.alphabetizeList();
      Controller.display();
    });
  },

  /* Decrements the quantity of an item from the shopping cart */
  removeOneItem: (itemID) => {
    currentAmount = localStorage.getItem(itemID);
    localStorage.setItem(itemID, (currentAmount-1));
    Service.loadShoppingCart();
    ServiceHeader.loadCurrentShoppingCart();
  },

  /* Activates or deactivates the '-' button according to the item's quantity */
  setMinusButton: (quantity) => {
    if (parseInt(quantity) == 1) {
      return true;
    }
    else {
      return false;
    }
  },

  /* Computes the total price of an item and of the whole shopping cart */
  totalRowPrice: (unitPrice, quantity) => {
    var totalRowDot = parseFloat(unitPrice) * parseInt(quantity);
    var totalRow = Service.formatPrice(totalRowDot);
    totalPrice += parseFloat(totalRowDot);
    return totalRow;
  }
};

/* Controller */
const Controller = {
  /* Displays the shopping cart */
  display: () => {
    $("tbody").empty();
    $(".shopping-cart-total").empty();
    totalPrice = 0;
    if(localStorage.length == 0) {
      $(".shopping-cart-table").hide();
      $(".shopping-cart-total").hide();
      $("#order").hide();
      $("#remove-all-items-button").hide();
      $('table').before('<p id="emptyCartText">Aucun produit dans le panier.</p>');
    }
    else {
      $(".shopping-cart-total").show();
      $("#order").show();
      $("#remove-all-items-button").show();
      $.each(products, function(index) {
        product = products[index];
        $('<tr id="' + product["id"] + '"><td><button class="remove-item-button" id="' + product["id"] + '" title="Supprimer" onclick="Service.deleteProduct(this, this.id)"><i class="fa fa-times"></i></button></td><td><a href="./product.html?id=' + product["id"] + '">' + product["name"] + '</a></td><td>' + Service.formatPrice(product["price"]) + '&thinsp;$</td><td><div class="row"><div class="col"><button class="remove-quantity-button" id="remove-quantity-btn-' + product["id"] + '" title="Retirer" onclick="Service.removeOneItem(' + product["id"] + ')"><i class="fa fa-minus"></i></button></div><div class="quantity">' + localStorage.getItem(product["id"]) + '</div><div class="col"><button class="add-quantity-button" title="Ajouter" onclick="Service.addOneItem(' + product["id"] + ')"><i class="fa fa-plus"></i></button></div></div></td><td>' + Service.totalRowPrice(product["price"] ,localStorage.getItem(product["id"])) + '&thinsp;$</td></tr>').appendTo('tbody');
        $("#remove-quantity-btn-" + product["id"]).prop('disabled', Service.setMinusButton(localStorage.getItem(product["id"])));
      });
      $('.shopping-cart-total').text('Total: ');
      $('<strong>' + Service.formatPrice(totalPrice) + '&thinsp;$</strong>').appendTo('.shopping-cart-total');
    }
  }
};

var products = [];
var totalPrice = 0;

Service.loadShoppingCart();
