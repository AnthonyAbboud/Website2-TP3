const Service = {

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

  loadShoppingCart: () => {
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
  }
};

const Controller = {

  display: () => {
    if(localStorage.length == 0) {
      $(".shopping-cart-table").hide();
      $(".shopping-cart-total").hide();
      $("#order").hide();
      $("#empty-cart").hide();
      $('<p id="emptyCartText">Aucun produit dans le panier.</p>').appendTo('article');
    }
    else {
      $(".shopping-cart-total").show();
      $("#order").show();
      $("#empty-cart").show();
      $.each(products, function(index) {
        product = products[index];
        $('<tr><td><button title="Supprimer"><i class="fa fa-times"></i></button></td><td><a href="./product.html?id=' + product["id"] + '">' + product["name"] + '</a></td></tr>').appendTo('tbody');
      });
    }
  }
};

var products = [];

Service.loadShoppingCart();