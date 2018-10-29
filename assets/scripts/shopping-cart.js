const Service = {

  addOneItem: (itemID) => {
    currentAmount = parseInt(localStorage.getItem(itemID));
    localStorage.setItem(itemID, (currentAmount+1));
    Service.loadShoppingCart();
    ServiceCurrentShoppingCart.loadCurrentShoppingCart();
  },

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

  deleteProduct: (itemRow, id) => {
    if(confirm("Voulez-vous supprimer le produit du panier?")) {
      $(itemRow).closest('tr').remove();
      localStorage.removeItem(String(id));
      Service.loadShoppingCart();
      ServiceCurrentShoppingCart.loadCurrentShoppingCart();
    }
    else{}
  },

  emptyCart: () => {
    if(confirm("Voulez-vous supprimer tous les produits du panier?")) {
      localStorage.clear();
      Service.loadShoppingCart();
      ServiceCurrentShoppingCart.loadCurrentShoppingCart();
    }
    else{}
  },

  formatPrice: (price) => {
    return price.toFixed(2).replace(".", ",");
  }, 

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

  removeOneItem: (itemID) => {
    currentAmount = localStorage.getItem(itemID);
    localStorage.setItem(itemID, (currentAmount-1));
    Service.loadShoppingCart();
    ServiceCurrentShoppingCart.loadCurrentShoppingCart();
  },

  setMinusButton: (quantity) => {
    if (parseInt(quantity) == 1) {
      return "disabled";
    }
    else {
      return "";
    }
  },

  totalRowPrice: (unitPrice, quantity) => {
    var totalRowDot = parseFloat(unitPrice) * parseInt(quantity);
    var totalRow = Service.formatPrice(totalRowDot);
    totalPrice += parseFloat(totalRowDot);
    return totalRow;
  }
};

const Controller = {
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
        $('<tr><td><button class="remove-item-button" id="' + product["id"] + '" title="Supprimer" onclick="Service.deleteProduct(this, this.id)"><i class="fa fa-times"></i></button></td><td><a href="./product.html?id=' + product["id"] + '">' + product["name"] + '</a></td><td>' + Service.formatPrice(product["price"]) + '&thinsp;$</td><td><div class="row"><div class="remove-quantity-button"><button title="Retirer" onclick="Service.removeOneItem(' + product["id"] + ')" ' + Service.setMinusButton(localStorage.getItem(product["id"])) + ' ><i class="fa fa-minus"></i></button></div><div class="quantity">' + localStorage.getItem(product["id"]) + '</div><div class="add-quantity-button"><button title="Ajouter" onclick="Service.addOneItem(' + product["id"] + ')"><i class="fa fa-plus"></i></button></div></div></td><td>' + Service.totalRowPrice(product["price"] ,localStorage.getItem(product["id"])) + '&thinsp;$</td></tr>').appendTo('tbody');
      });
      $('.shopping-cart-total').text('Total: ');
      $('<strong>' + Service.formatPrice(totalPrice) + '&thinsp;$</strong>').appendTo('.shopping-cart-total');
    }
  }
};

var products = [];
var totalPrice = 0;

Service.loadShoppingCart();
